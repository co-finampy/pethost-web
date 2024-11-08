"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createReserva } from "@/app/app/vizualizar-reservas/_components/actions";

export function CadastroReserva() {
  const [formData, setFormData] = useState({
    uidClient: "",
    uidAnfitriao: "",
    uidPet: "",
    tipoReserva: "",
    dataEntrada: "",
    dataSaida: "",
    valor: "",
    status: "pendente",
    observacoes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Atualiza os dados de cada campo do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Valida os dados do formulário antes do envio
  const validateForm = () => {
    if (!formData.uidClient || !formData.uidAnfitriao || !formData.uidPet || !formData.tipoReserva || !formData.dataEntrada || !formData.dataSaida || !formData.valor) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return false;
    }
    if (new Date(formData.dataEntrada) >= new Date(formData.dataSaida)) {
      setError("A data de entrada deve ser anterior à data de saída.");
      return false;
    }
    setError("");
    return true;
  };

  // Envia o formulário e faz o POST para o endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const reserva = await createReserva(formData);  // Chama a função para criar reserva
      alert("Reserva criada com sucesso!");
      // Limpa o formulário após o envio
      setFormData({
        uidClient: "",
        uidAnfitriao: "",
        uidPet: "",
        tipoReserva: "",
        dataEntrada: "",
        dataSaida: "",
        valor: "",
        status: "pendente",
        observacoes: "",
      });
    } catch (error) {
      console.error("Erro ao registrar reserva:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Criar Nova Reserva</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <Input
            type="text"
            name="uidClient"
            value={formData.uidClient}
            onChange={handleChange}
            placeholder="ID do Cliente"
          />
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
            placeholder="Observações"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrar Reserva"}
          </Button>
        </div>
      </form>
    </div>
  );
}
