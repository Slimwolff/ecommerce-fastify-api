import userController from "../controllers/user.controller.ts"


export default function (fastify, opts, done) {
    fastify.get("/user", userController)
    done()
}