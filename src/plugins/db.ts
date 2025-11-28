import { PrismaClient } from "@prisma/client"
import { FastifyInstance } from "fastify"
import fp from "fastify-plugin"


export default fp(async function (fastify: FastifyInstance) {

    const prisma = new PrismaClient()

    await prisma.$connect()

    fastify.decorate("prisma", prisma)


    fastify.addHook("onClose", async (fast, done)=>{
        try {
            await prisma.$disconnect()
        } catch (err) {
            fast.log.error("Error disconnecting Prisma", err)
        } finally {
            done()
        }
    })


    
})