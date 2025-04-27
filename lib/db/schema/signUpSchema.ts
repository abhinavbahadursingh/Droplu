import { emitWarning } from "process"
import { PassThrough } from "stream"
import * as z from "zod"

export const signUpSchema = z
    .object({
        email: z
            .string()
            .min(1 , {message: "Email is required"})
            .email({message: "Please enter a valid email"}),
        password: z
            .string()
            .min(1 , {message: " password is required"})
            .min(8, {message: "min length of password is 8"}),
        passwordConfirmation: z 
            .string()
            .min(1 , {message: "please confirm your password"})
})
.refine((data)=> data.password === data.passwordConfirmation , {
    message: "password do not match",
    path: ["passwordConfirmation"]
})