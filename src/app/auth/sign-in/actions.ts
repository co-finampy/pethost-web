'use server'

import { SignInWithPassword } from "@/http/sign-in-with-password"
import { HTTPError } from "ky"
import { z } from "zod"

const SignInShema = z.object({
  email: z.string().email({ message: 'Por favor. preencher corretamente o email' }),
  senha: z.string().min(6, { message: 'Por favor, preencher a senha, minimo 6 caracteres' }),
})

export async function SignInWithEmailAndPassword(input: FormData) {
  const result =  SignInShema.safeParse(Object.fromEntries(input))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors}
  }

  const { email, senha } = result.data

 try {
  const { token } = await SignInWithPassword({ 
    email: String(email), 
    senha: String(senha),
  })
  console.log(token)
 } catch (err) {
  if (err instanceof HTTPError) {
    const { message } = await err.response.json()

    return { success: false, message, errors: null }
  }
  
  console.log(err)

  return {
    success: false,
    message: 'Algo deu errado, tente novamente mais tarde',
    errors: null,
  }
 }

  return { success: true, message: null, errors: null }
}