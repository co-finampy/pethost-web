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

export async function PutProfile(sub: string, token: string) {
  const result = await api.put(`v1/usuarios/atualizar/${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).json<GetProfileResponse>()
  return result
}