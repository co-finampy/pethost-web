import { api } from "./api-client"

interface GetProfileResponse {
  uid: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string | null;
  tipoUsuario: string | null;
  endereco: string | null;
  fotoUrl: string | null;
  datasDisponiveis: string[] | null;
  pets: string[];
  token: string | null;
  authorities: string[];
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  password: string;
}

export async function GetProfile(sub: string, token: string) {
  const result = await api.get(`v1/usuarios/buscar/${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).json<GetProfileResponse>()
  console.log(result)
  return result
}