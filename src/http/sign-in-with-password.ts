import { api } from "./api-client";

interface SignInWithPasswordRequest {
  email: string;
  senha: string;
}

interface SignInWithPasswordResponse {
  idUsuario: string;
  email: string;
  nome: string;
  token: string;
  expiraEm: string;
}

export async function SignInWithPassword({email, senha}: SignInWithPasswordRequest) {
  try {
    const result = await api.post('auth/login', {
      json: {
        email,
        senha,
      }
    }).json<SignInWithPasswordResponse>()
  
    return result
  } catch (error) {
    console.error("teste", error)
    
  }
}