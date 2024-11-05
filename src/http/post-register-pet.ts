import { api } from "./api-client";

export interface RegisterPetRequest {
    tipoPet: string;
    nomePet: string;
    raca: string;
    genero: string;
    tamanho: string;
    dataNascimento: string;
    vacina: boolean;
    castrado: boolean;
    foto: string;
    criadoEm: string;
    uidUsuario: string;
}

type RegisterPetResponse = void;

export async function registerPet({
    tipoPet,
    nomePet,
    raca,
    genero,
    tamanho,
    dataNascimento,
    vacina,
    castrado,
    foto,
    criadoEm,
    uidUsuario,
}: RegisterPetRequest, token: string | null): Promise<RegisterPetResponse> {

    const requestBody = {
        tipoPet,
        nomePet,
        raca,
        genero,
        tamanho,
        dataNascimento,
        vacina,
        castrado,
        foto,
        criadoEm,
        uidUsuario
    };

    const headers = {
        Authorization: `Bearer ${token}`
    };

    // Log para verificar os dados da requisição
    console.log("Enviando requisição para /v1/pets/criar");
    console.log("URL: /v1/pets/criar");
    console.log("Dados:", requestBody);
    console.log("Cabeçalhos:", headers);

    await api.post('v1/pets/criar', {
        json: requestBody,
        headers: headers
    });
}