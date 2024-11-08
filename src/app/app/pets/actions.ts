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
    // dataNascimento: z.string().refine((value) => {
    //     const date = new Date(value);
    //     return !isNaN(date.getTime()); // Valida se a string é uma data válida
    // }, { message: 'Por favor, insira uma data de nascimento válida.' }),
    // vacina: z.boolean(), // Não precisa de refinamento, já é um booleano
    // castrado: z.boolean(), // Não precisa de refinamento, já é um booleano
    uidUsuario: z.string().min(1, { message: 'Por favor, selecione o tamanho.' }), // Alterado para validar que algo seja selecionado
    // foto: z.string().min(1, { message: 'Por favor, forneça uma foto do pet.' }), // Alterado para validar que algo seja fornecido
});

export async function registerPetAction(input: FormData) {
    const result = petSchema.safeParse(Object.fromEntries(input));
    console.log("teste =", input)

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
        const {token} = await getSubFromToken();
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