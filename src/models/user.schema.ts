import z from "zod";

const genderEnum = z.enum(["M","F","N","O"])
const passwordSchema = z.string().min(8).refine(
    (v) =>
        /[A-Z]/.test(v) &&
        /[0-9]/.test(v) &&
        /[^A-Za-z0-9]/.test(v),
        "Password must contain at least one uppercase letter, one number, and one symbol"
)

const createUserSchema = z.object({
    first_name: z.string().max(255),
    last_name: z.string().max(255),
    birthdate: z.date(),
    gender: genderEnum,
    address: z.object(),
    email: z.email(),
    password: passwordSchema
})

type CreateUserInput = z.infer<typeof createUserSchema>