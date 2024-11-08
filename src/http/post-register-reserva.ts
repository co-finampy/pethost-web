import { api } from "./api-client"; // Importe o cliente de API corretamente

// Definindo o tipo para a requisição de reserva
interface ReservaRequest {
  uidClient: string;
  uidAnfitriao: string;
  uidPet: string;
  tipoReserva: string;
  dataEntrada: string;
  dataSaida: string;
  valor: number;  // Ajuste: Tratando como número
  status: string;
}

// Tipo de resposta da API (ajustado conforme a resposta esperada da sua API)
type ReservaResponse = {
  uid: string;
  uidClient: string;
  uidAnfitriao: string;
  uidPet: string;
  tipoReserva: string;
  dataEntrada: string;
  dataSaida: string;
  valor: number;  // Ajuste: Tratando como número
  status: string;
  createdAt: string;
};

// Função para registrar a reserva
export async function registrarReserva({
  uidClient,
  uidAnfitriao,
  uidPet,
  tipoReserva,
  dataEntrada,
  dataSaida,
  valor,
  status,
}: ReservaRequest): Promise<ReservaResponse> {
  try {
    // Fazendo a requisição à API para registrar a reserva
    const response = await api.post("v1/reservas/criar", {
      json: {
        uidClient,
        uidAnfitriao,
        uidPet,
        tipoReserva,
        dataEntrada,
        dataSaida,
        valor,
        status,
      },
    });

    // Verificando o status da resposta
    if (response.status !== 200) {
      const errorMessage = await response.text(); // Obtém a mensagem de erro detalhada da resposta
      throw new Error(`Erro ao criar reserva: ${errorMessage}`);
    }

    // Retorna os dados da reserva criada
    return await response.json(); // Ajuste para garantir que estamos lidando com a resposta corretamente
  } catch (error: any) {
    throw new Error(`Erro ao registrar a reserva: ${error.message}`);
  }
}
