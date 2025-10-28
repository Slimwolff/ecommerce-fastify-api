import type { FastifyInstance, FastifySchema } from "fastify"
import {getUser, createUser} from "../controllers/user.controller.ts"


export default function (fastify: FastifyInstance , _opts: FastifySchema, done) {
    fastify.route({
        method: 'GET',
        url: '/user',
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        res: { type: 'string'}
                    }
                }
            }
        },
        handler: getUser
    })
    fastify.post("/user", {
        schema: {
            body: {
                
                name: 'string',
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        "name": { type: 'string' }
                    }
                }
            }
        }
    },createUser)
    done()
}