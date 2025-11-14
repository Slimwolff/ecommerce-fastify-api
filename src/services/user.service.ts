import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/prisma.ts";
import type { CreateUserInput } from "../models/user.schema.ts";
import { hashPassword } from "../utils/hash.ts";

export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input

    const { hash, salt } = hashPassword(password)

        const user = await prisma.user.create({
            data: { ...rest, salt, password: hash }
        })   

        console.log(user);
        

        return user
}