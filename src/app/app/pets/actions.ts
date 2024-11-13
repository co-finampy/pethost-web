'use server'

import { getSubFromToken } from "@/http/get-sub-jwt";
import { registerPet } from "@/http/post-register-pet"
import { uploadImageS3Client } from "@/http/post-upload-file";
import { HTTPError } from "ky"


import { z } from "zod"

const petSchema = z.object({
    tipoPet: z.string().min(1, { message: 'Por favor, selecione o tipo de pet.' }),
    nomePet: z.string().min(1, { message: 'Por favor, preencha o nome do pet.' }),
    raca: z.string().min(1, { message: 'Por favor, preencha a raça do pet.' }),
    genero: z.string().min(1, { message: 'Por favor, selecione o gênero.' }),
    tamanho: z.string().min(1, { message: 'Por favor, selecione o tamanho.' }),
    dataNascimento: z.string().min(1, { message: 'Por favor, preencha a data de nascimento.' }),
    vacina: z.union([
        z.literal('on'),
        z.literal('off'),
        z.boolean()
    ])
    .transform((value ) => value  === true || value === 'on')
    .default(false),
    castrado: z.union([
        z.literal('on'),
        z.literal('off'),
        z.boolean()
    ])
    .transform((value ) => value  === true || value === 'on')
    .default(false),
    foto: z.instanceof(File)
    .refine(file => file.size !== 0 && file.name !== undefined)
    .refine(file => ['image/jpeg', 'image/png'].includes(file.type))
    .refine(file => file.size <= 5 * 1024 * 1024, { message: 'A imagem deve ter no máximo 5MB.' }),
    uidUsuario: z.string().min(1, { message: 'Usuário não encontrado.' })
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
        dataNascimento,
        vacina,
        castrado,
        foto,
        uidUsuario
    } = result.data;
    try {
        const { token} = await getSubFromToken();
        await uploadImageS3Client(foto, token as string);
        const fotoUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${result.data.foto.name}`;
        await registerPet({
            tipoPet,
            nomePet,
            raca,
            genero,
            tamanho,
            dataNascimento,
            vacina,
            castrado,
            foto: fotoUrl,
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