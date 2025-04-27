import * as z from 'zod';

export const signInSchemaa = z 
    .object({
        identifier: z
            .string()
            .min(1 , {message: "email is required"})
            .email({message: "enter a valid email"}),
        password: z
            .string()
            .min(1 , {message: "password is required"})
            .min(8 , {message: "min length required is 8"}),
        
    })