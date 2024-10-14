import { api } from "./api-client"

interface GetProfileResponse {
  idUsuario: string
  email: string
  nome: string
}

export async function GetProfile() {
  const result = await api.get('v1/usuarios/buscar').json<GetProfileResponse>()

  return result
}