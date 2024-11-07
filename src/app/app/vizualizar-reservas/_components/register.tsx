// src/components/Register.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export function CadastroReservaModal() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Reserva criada com sucesso!");
      } else {
        alert("Erro ao criar reserva.");
      }
    } catch (error) {
      console.error("Erro ao registrar reserva:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Criar Nova Reserva</h2>
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
          <Button type="submit">Registrar Reserva</Button>
        </div>
      </form>
    </div>
  );
}
