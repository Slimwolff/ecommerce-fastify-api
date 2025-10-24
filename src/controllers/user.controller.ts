import fastify from "fastify"

export default function userController(req) {
    console.log("User Controller Reached!!")

    return { id: 1, name: "User Name Test"}
}

fastify.route()