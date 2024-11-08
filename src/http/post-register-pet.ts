import { api } from "./api-client";

export interface RegisterPetRequest {
    tipoPet: string;
    nomePet: string;
    raca: string;
    genero: string;
    tamanho: string;
    uidUsuario: string;
    // dataNascimento: string;
    // vacina: boolean;
    // castrado: boolean;
    // foto: string;
}

type RegisterPetResponse = void;

export async function registerPet({
    tipoPet,
    nomePet,
    raca,
    genero,
    tamanho,
    uidUsuario
}: RegisterPetRequest, token?: string): Promise<RegisterPetResponse> {
    await api.post('/v1/pets/criar', {
        json: {
            tipoPet,
            nomePet,
            raca,
            genero,
            tamanho,
            uidUsuario
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}