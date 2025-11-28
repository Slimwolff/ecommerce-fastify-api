import { type FastifyInstance, type FastifyPluginAsync } from "fastify"
import {getUserById, createUserHandler} from "../controllers/user.controller.ts"
import {CreateUserInputSchema, CreateUserResponse} from "../models/user.schema.ts"
import UserServiceImpl, { userService } from "../services/user.service.ts"
import fp from "fastify-plugin"

declare module 'fastify' {
    export interface FastifyInstance {
        userService: userService
    }
}

const userRoutes:FastifyPluginAsync = (fastify: FastifyInstance) => {

    if (!fastify.prisma) {
        throw new Error("Please ensure prisma plugin has started first!")
    }

    const userService = new UserServiceImpl(fastify.prisma)

    fastify.decorate("userService", userService)

    fastify.route({
        method: 'GET',
        url: '/user/',
        handler: async function(req, rep) {

            const user = await this.userService.getUserById(req.query.id)

            return rep.code(201).send(user)
        }
    })

    fastify.route({
        method: 'POST',
        url: '/v1/user/',
        schema: {
            body: CreateUserInputSchema,
            response: {
                201: CreateUserResponse
            }
        },
        handler: async function (req, rep) {

            const newUser = await this.userService.create(req.body)

            return rep.code(201).send(newUser)
        }
    })
}

export default fp(userRoutes)

// const userRoutesPlugin = fp(userRoutes)

// export{ userRoutesPlugin }