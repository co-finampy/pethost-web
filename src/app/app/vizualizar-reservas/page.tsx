"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useUserProfile } from "@/hooks/use-user-profile";
import { getSubFromToken } from "@/http/get-sub-jwt";

// Tipagem das reservas (pode ser ajustada conforme sua API)
interface Reserva {
  uid: string;
  uidClient: string;
  uidAnfitriao: string;
  uidPet: string;
  tipoReserva: string;
  dataEntrada: string;
  dataSaida: string;
  valor: string;
  status: string;
  createdAt: string;
}

export default  function Page() {
  const [reservations, setReservations] = useState<Reserva[]>([]); // Lista de reservas
  const {user} = useUserProfile();
  const { sub, token } = getSubFromToken();
  const [formData, setFormData] = useState({
    uidClient: user?.uid,
    uidAnfitriao: "",
    uidPet: "",
    tipoReserva: "",
    dataEntrada: "",
    dataSaida: "",
    valor: "",
    status: "Pendente", // Status inicial
    observacoes: "", // Adicionando a chave 'observacoes' ao estado
  });

  // Função para carregar as reservas
  useEffect(() => {
    async function fetchReservations() {
      try {

        if (!token) {
          alert("Você não está autenticado!");
          return;
        }

        const response = await fetch(`http://localhost:8080/v1/reservas/${user.uid}/listar`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Envia o token JWT no cabeçalho
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao carregar reservas: ${response.statusText}`);
        }

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Erro ao carregar as reservas:", error);
      }
    }

    fetchReservations();
  }, []);

  // Função para capturar as mudanças nos campos do formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   

    if (!token) {
      alert("Você não está autenticado!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/v1/reservas/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Envia o token JWT no cabeçalho
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Erro ao criar reserva: ${errorText || "Erro desconhecido"}`);
        return;
      }

      const data = await response.json();
      alert("Reserva criada com sucesso!");

      // Limpa o formulário e recarrega a lista de reservas
      setFormData({
        uidClient: user?.uid,
        uidAnfitriao: "",
        uidPet: "",
        tipoReserva: "",
        dataEntrada: "",
        dataSaida: "",
        valor: "",
        status: "Pendente",
        observacoes: "", // Limpa também o campo observacoes
      });
      setReservations((prev) => [...prev, data]); // Atualiza a lista com a nova reserva
    } catch (error) {
      console.error("Erro ao registrar reserva:", error);
      alert("Erro ao criar reserva.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Reservas</h2>

      {/* Formulário de criação de reserva */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Criar Nova Reserva</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
          
            <Input
              type="text"
              name="uidAnfitriao"
              value={formData.uidAnfitriao}
              onChange={handleChange}
              placeholder="ID do Anfitrião"
            />
            <Input
              type="text"
              name="uidPet"
              value={formData.uidPet}
              onChange={handleChange}
              placeholder="ID do Pet"
            />
            <Input
              type="text"
              name="tipoReserva"
              value={formData.tipoReserva}
              onChange={handleChange}
              placeholder="Tipo de Reserva"
            />
            <Input
              type="datetime-local"
              name="dataEntrada"
              value={formData.dataEntrada}
              onChange={handleChange}
            />
            <Input
              type="datetime-local"
              name="dataSaida"
              value={formData.dataSaida}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              placeholder="Valor"
            />
            <Textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Observações (opcional)"
            />
            <Button type="submit" className="w-full">
              Registrar Reserva
            </Button>
          </div>
        </form>
      </div>

      {/* Exibição das reservas */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Lista de Reservas</h3>
        <div className="grid gap-4">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div
                key={reservation.uid}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h4 className="text-lg font-semibold">Reserva ID: {reservation.uid}</h4>
                <p><strong>Cliente:</strong> {reservation.uidClient}</p>
                <p><strong>Anfitrião:</strong> {reservation.uidAnfitriao}</p>
                <p><strong>Pet:</strong> {reservation.uidPet}</p>
                <p><strong>Entrada:</strong> {new Date(reservation.dataEntrada).toLocaleString()}</p>
                <p><strong>Saída:</strong> {new Date(reservation.dataSaida).toLocaleString()}</p>
                <p><strong>Valor:</strong> R$ {reservation.valor}</p>
                <p><strong>Status:</strong> {reservation.status}</p>
                <p><strong>Criada em:</strong> {new Date(reservation.createdAt).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>Não há reservas para exibir.</p>
          )}
        </div>
      </div>
    </div>
  );
}
