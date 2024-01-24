
import * as z from 'zod'

export const LoginAuthShema = z.object({
    email: z.string().email({message: 'Mail invalide'}),
    password: z.string().min(3, { message: 'Veuillez entrer un mot de passe valide'})
})

export const RegisterAuthShema = z.object({
    name: z.string().min(3, { message: 'Veuillez entrer Nom Valide'}),
    email: z.string().email({message: 'Mail invalide'}),
    password: z.string().min(3, { message: 'Veuillez entrer un mot de passe valide'})
})
