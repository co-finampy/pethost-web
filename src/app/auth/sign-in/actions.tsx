'use server'

import { SignInWithPassword } from "@/http/sign-in-with-password"

export async function SignInWithEmailAndPassword(input: FormData) {
  const { email, password } = Object.fromEntries(input)
  console.log(input)
  const result = await SignInWithPassword({ 
    email: String(email), 
    password: String(password),
  })

  console.log(result)
}