import { api } from "./api-client"

interface GetAllPetsResponse {
    id: number
    tipoPet: string
    nomePet: string
    raca: string
    genero: string
    tamanho: string
    dataNascimento: string
    vacina: boolean
    castrado: boolean
    foto: string
    criadoEm: string
    idUsuario: number
    nomeUsuario: string
}

export async function GetAllPetsByUserEmail(userEmal: string, token: string) {
    const result = await api.get(`v1/pets/buscar/${userEmal}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).json<GetAllPetsResponse[]>()
    console.log(result)
    return result
}