import { api } from "./api-client";

interface SignUpRequest {
  nome: string;
  email: string;
  senha: string;
}

type SignUpResponse = void

export async function signUp({
  nome,
  email, 
  senha
}: SignUpRequest): Promise<SignUpResponse> {
  await api.post('auth/registrar', {
    json: {
      nome,
      email,
      senha,
    }
  })
}