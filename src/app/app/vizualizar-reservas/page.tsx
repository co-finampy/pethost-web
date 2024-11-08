'use client';

import { useState } from "react";

interface DadosFormulario {
  uidPet: string;
  dataEntrada: string;
  dataSaida: string;
  tipoReserva: string;
  valor: number;
  status: string;
  observacoes: string;
}

const ReservaForm = () => {
  const [dadosFormulario, setDadosFormulario] = useState<DadosFormulario>({
    uidPet: "",
    dataEntrada: "",
    dataSaida: "",
    tipoReserva: "",
    valor: 0,
    status: "",
    observacoes: "",
  });

  const [mensagemErro, setMensagemErro] = useState("");
  const [reservaCriada, setReservaCriada] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/v1/reservas/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGxhbmtlbHZlbm5AZ21haWwuY29tIiwiaWF0IjoxNzMxMDM4ODA0LCJleHAiOjE3MzEwNDI0MDR9.shqfYHgZgNDjAixgxG2oer62Nu-IIQYOqRHG2t9rB7I",
        },
        body: JSON.stringify(dadosFormulario),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setMensagemErro(`Erro ao registrar a reserva: ${errorMessage}`);
        return;
      }

      const data = await response.json();
      setReservaCriada(data);
      setMensagemErro("");

      // Limpar o formulário
      setDadosFormulario({
        uidPet: "",
        dataEntrada: "",
        dataSaida: "",
        tipoReserva: "",
        valor: 0,
        status: "",
        observacoes: "",
      });
    } catch (error) {
      setMensagemErro("Erro de rede ou servidor.");
    }
  };

  return (
    <div>
      <h1>Criar Reserva</h1>
      <form onSubmit={handleSubmit}>
        <label>
          UID do Pet:
          <input
            type="text"
            name="uidPet"
            value={dadosFormulario.uidPet}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Data de Entrada:
          <input
            type="datetime-local"
            name="dataEntrada"
            value={dadosFormulario.dataEntrada}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Data de Saída:
          <input
            type="datetime-local"
            name="dataSaida"
            value={dadosFormulario.dataSaida}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Tipo de Reserva:
          <select
            name="tipoReserva"
            value={dadosFormulario.tipoReserva}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="hospedagem">Hospedagem</option>
            <option value="creche">Creche</option>
            <option value="passeio">Passeio</option>
          </select>
        </label>
        <br />
        <label>
          Valor:
          <input
            type="number"
            name="valor"
            value={dadosFormulario.valor}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={dadosFormulario.status}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Observações:
          <input
            type="text"
            name="observacoes"
            value={dadosFormulario.observacoes}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Criar Reserva</button>
      </form>

      {mensagemErro && <div style={{ color: "red" }}>{mensagemErro}</div>}

      {reservaCriada && (
        <div>
          <h2>Reserva Criada com Sucesso!</h2>
          <pre>{JSON.stringify(reservaCriada, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ReservaForm;
