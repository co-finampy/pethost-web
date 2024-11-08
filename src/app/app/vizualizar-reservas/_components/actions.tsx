'use client';

import { useState } from "react";

export const createReserva = async (formData: {
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
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        const errorMessage = await response.text();
        throw new Error(`Erro ao registrar reserva: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Erro ao registrar reserva:", error);
      throw error;
    }
  };
  