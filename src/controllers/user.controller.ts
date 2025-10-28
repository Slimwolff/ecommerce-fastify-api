import type { FastifyReply, FastifyRequest } from "fastify"

export function getUser(req: FastifyRequest, res: FastifyReply) {

    console.log("User Controller Reached!!")

    
    res.status(201).send({"hello": "test"})
}

export function createUser(req: FastifyRequest, res: FastifyReply) {
    console.log(req.body)
    res.send({method: "sucessfull"})
    return 
    
}