'use server'

import { getSubFromToken } from "@/http/get-sub-jwt";
import { registerPet } from "@/http/post-register-pet"
import { HTTPError } from "ky"


import { z } from "zod"

const petSchema = z.object({
    tipoPet: z.string().min(1, { message: 'Por favor, selecione o tipo de pet.' }), // Alterado para validar que algo seja selecionado
    nomePet: z.string().min(1, { message: 'Por favor, preencha o nome do pet.' }), // Alterado para nome, não é um email
    raca: z.string().min(1, { message: 'Por favor, preencha a raça do pet.' }), // Alterado para validação de string não vazia
    genero: z.string().min(1, { message: 'Por favor, selecione o gênero.' }), // Alterado para validar que algo seja selecionado
    tamanho: z.string().min(1, { message: 'Por favor, selecione o tamanho.' }), // Alterado para validar que algo seja selecionado
    uidUsuario: z.string().min(1, { message: 'Usuário não encontrado.' }) // Alterado para validar que algo seja selecionado
});

export async function registerPetAction(input: FormData) {
    const result = petSchema.safeParse(Object.fromEntries(input));
    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return { success: false, message: null, errors };
    }

    const {
        tipoPet,
        nomePet,
        raca,
        genero,
        tamanho,
        uidUsuario
    } = result.data;
    try {
        const { token} = await getSubFromToken();
        await registerPet({
            tipoPet,
            nomePet,
            raca,
            genero,
            tamanho,
            uidUsuario
        }, token as string);
    } catch (error) {
        if (error instanceof HTTPError) {
            const { nome, mensagem } = await error.response.json();
            return { success: false, message: `${nome}: ${mensagem}`, errors: null };
        }
        
        return {
            success: false,
            message: 'Erro inesperado, tente novamente',
            errors: null
        };
    }
    return { success: true, message: null, errors: null };
}