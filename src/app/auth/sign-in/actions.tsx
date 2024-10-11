'use server'

import { SignInWithPassword } from "@/http/sign-in-with-password"

export async function SignInWithEmailAndPassword(previousState: unknown,input: FormData) {
  console.log(previousState)
  const { email, senha } = Object.fromEntries(input)

  await new Promise((resolve) => setTimeout(resolve, 3000))

  const result = await SignInWithPassword({ 
    email: String(email), 
    senha: String(senha),
  })
  console.log(result)

  return 'Sucesso'
}