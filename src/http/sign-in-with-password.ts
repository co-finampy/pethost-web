import { api } from "./api-client";

interface SignInWithPasswordRequest {
  email: string;
  senha: string;
}

interface SignInWithPasswordResponse {
  token: string;
}

export async function signInWithPassword({
  email, 
  senha
}: SignInWithPasswordRequest) {
  const result = await api.post('auth/login', {
    json: {
      email,
      senha,
    }
  }).json<SignInWithPasswordResponse>()

  return result
}