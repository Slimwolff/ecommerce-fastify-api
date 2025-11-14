import type { FastifyReply, FastifyRequest } from "fastify"
import { log } from "node:console"
import { createUser } from "../services/user.service.ts"
import type { CreateUserInput } from "../models/user.schema.ts"

export function getUserById(req: FastifyRequest, res: FastifyReply) {

    console.log("User Controller Reached!!")

    
    res.status(201).send({"hello": "test"})
}

export async function createUserHandler(
    req: FastifyRequest<{
        Body: CreateUserInput
    }>, 
    res: FastifyReply) {
    
    const body = req.body
    console.log(Object.assign({"body": "CONTENT"}, body));
    

    try {

        const user = await createUser(body)

        return res.code(201).send(user)

    } catch (e: any) {
        
        console.log(e)

        if ( e.name == "PrismaClientKnownRequestError") {
            return res.code(500).send(e)  
        }
        return res.code(500)
    }
    
}