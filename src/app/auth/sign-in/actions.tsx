'use server'

import { SignInWithPassword } from "@/http/sign-in-with-password"

export async function SignInWithEmailAndPassword(input: FormData) {
  const { email, senha } = Object.fromEntries(input)
  const result = await SignInWithPassword({ 
    email: String(email), 
    senha: String(senha),
  })
  console.log(result)
}