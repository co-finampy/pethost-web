// src/actions/action.ts

import { getSubFromToken } from "@/http/get-sub-jwt";

export const registerReserva = async (data: {
    uidClient: string;
    uidAnfitriao: string;
    uidPet: string;
    tipoReserva: string;
    dataEntrada: string;
    dataSaida: string;
    valor: string;
    status: string;
    observacoes?: string;
  }) => {
    try {
      const { sub, token } = await getSubFromToken();

      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Erro ao registrar reserva.");
      }
    } catch (error) {
      console.error("Erro ao registrar reserva:", error);
      throw error;
    }
  };
  
  export const cancelReserva = async (uid: string) => {
    try {
      const response = await fetch(`/api/reservas/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Cancelada" }),
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Erro ao cancelar reserva.");
      }
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
      throw error;
    }
  };
  