import { api } from "./api-client";

interface SignInWithPasswordRequest {
  email: string;
  password: string;
}

interface SignInWithPasswordResponse {
  idUsuario: string;
  email: string;
  nome: string;
  token: string;
  expiraEm: string;
}

export async function SignInWithPassword({email, password}: SignInWithPasswordRequest) {
  try {
    const result = await api.post('auth/login', {
      json: {
        email,
        password,
      }
    }).json<SignInWithPasswordResponse>()
  
    return result
  } catch (error) {
    console.error(error)
    
  }
}