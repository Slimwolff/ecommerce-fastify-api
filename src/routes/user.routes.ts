import type { FastifyInstance } from "fastify"
import {getUserById, createUserHandler} from "../controllers/user.controller.ts"
import {CreateUserInputSchema, CreateUserResponse} from "../models/user.schema.ts"

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get("/user", getUserById)
    fastify.post("/user", 
        {
            schema: {
                body: CreateUserInputSchema,
                response: {
                    201:   CreateUserResponse 
                }
            },
        },
        createUserHandler
    )
}