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
  pets: Pet[];
  token: string | null;
  authorities: string[];
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  password: string;
}


export interface Pet {
  id: number;
  tipoPet: string;
  nomePet: string;
  raca: string;
  genero: "Masculino" | "Feminino"; 
  tamanho: "Pequeno" | "Médio" | "Grande"; 
  dataNascimento: string;
  vacina: boolean;
  castrado: boolean;
  foto: string;
  criadoEm: string;
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