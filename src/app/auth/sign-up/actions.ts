'use server'

import { signUp } from "@/http/sign-up"
import { HTTPError } from "ky"


import { z } from "zod"

const signUpSchema = z.object({
  nome: z.string().refine((value) => value.split(' ').length > 1, { message: 'Por favor, preencher o nome completo' }),
  email: z.string().email({ message: 'Por favor, preencher corretamente o email' }),
  senha: z.string().min(6, { message: 'Por favor, preencha a senha, mínimo 6 caracteres' }),
  confirmarSenha: z.string().min(6, { message: 'Por favor, preencha a senha, mínimo 6 caracteres' }),
})
.refine((data) => data.senha === data.confirmarSenha, {
  message: 'As senhas não conferem',
  path: ['confirmarSenha'],
})

export async function signUpAction(input: FormData){
  const result =  signUpSchema.safeParse(Object.fromEntries(input))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors}
  }

  const {nome, email, senha } = result.data

 try {
   await signUp({
    nome,
    email, 
    senha,
  })
 } catch (error) {
  if ( error instanceof HTTPError) {
    const { nome, mensagem } = await error.response.json()

    return { success: false, message: `${nome}: ${mensagem}`, errors: null }
  }

  return {
    success: false,
    message: 'Erro inesperado, tente novamente',
    errors: null
  }
 }

  return { success: true, message: null, errors: null }
}