import { getSubFromToken } from "@/http/get-sub-jwt";

export const registerReserva = async (data: {
  uidClient: string;
  uidAnfitriao: string;
  uidPet: string;
  tipoReserva: string;
  dataEntrada: string;
  dataSaida: string;
  valor: number;  // Ajuste: se o valor for numérico
  status: string;
  observacoes?: string;
}) => {
  try {
    const { token } = await getSubFromToken(); // Obtém o token para autenticação

    // Caso as datas ainda não estejam no formato ISO, podemos ajustá-las
    const dadosAjustados = {
      ...data,
      dataEntrada: new Date(data.dataEntrada).toISOString(),
      dataSaida: new Date(data.dataSaida).toISOString(),
    };

    const response = await fetch("/api/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho da requisição
      },
      body: JSON.stringify(dadosAjustados), // Envia os dados ajustados da reserva como JSON no corpo da requisição
    });

    if (response.ok) {
      return await response.json(); // Retorna os dados da reserva registrada
    } else {
      const errorMessage = await response.text(); // Obtém a mensagem de erro da resposta
      throw new Error(`Erro ao registrar reserva: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erro ao registrar reserva:", error);
    throw error; // Lança o erro para ser tratado na chamada
  }
};

export const cancelReserva = async (uid: string) => {
  try {
    const { token } = await getSubFromToken(); // Obtém o token para autenticação

    const response = await fetch(`/api/reservas/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho da requisição
      },
      body: JSON.stringify({ status: "Cancelada" }), // Atualiza o status da reserva para 'Cancelada'
    });

    if (response.ok) {
      return await response.json(); // Retorna os dados da reserva cancelada
    } else {
      const errorMessage = await response.text(); // Obtém a mensagem de erro da resposta
      throw new Error(`Erro ao cancelar reserva: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erro ao cancelar reserva:", error);
    throw error; // Lança o erro para ser tratado na chamada
  }
};
