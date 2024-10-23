'use server'

import { cookies } from "next/headers";

export async function getSubFromToken(): Promise<{ sub: string | null; token: string | null }> {
  try {
    // Obtém o token diretamente do cookie
    const token = cookies().get('token')?.value;

    if (!token) {
      console.error('Token não encontrado nos cookies');
      return { sub: null, token: null }; // Retorna null se não encontrar o token
    }

    // Aqui, você poderia decodificar o JWT se precisar extrair o 'sub'
    // Caso contrário, você pode assumir que o 'sub' é o próprio token
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
    const sub = decodedToken.sub || null; // Substitua por outra lógica se necessário

    return { sub, token }; // Retorna o sub e o token
  } catch (error) {
    console.error('Erro ao buscar o sub:', error);
    return { sub: null, token: null };
  }
}
