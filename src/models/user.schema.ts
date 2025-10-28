import z from "zod";

const createUserSchema = z.object({
    first_name: z.string(),
    last_name: z.string()
})