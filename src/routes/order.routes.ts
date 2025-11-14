import type { FastifyInstance } from "fastify"
import { CreateOrderSchema } from "../models/order.schema.ts"
import { addTrackerOrderHandler, changeOrderStatusHandler, createOrderHandler, getOrderByIdHandler, getOrderByUserHandler } from "../controllers/order.controller.ts"

export async function orderRoutes(fastify: FastifyInstance) {

    fastify.get("/id/:id", getOrderByIdHandler)
    
    fastify.get("/userid/:userId", getOrderByUserHandler)
    
    fastify.post("/create", {
        schema: {
            body: CreateOrderSchema,
            response: {
                200: {
                    id: {type: "number"}
                }
            }
        }
    }, createOrderHandler)

    fastify.post("/updateOrderStatus", changeOrderStatusHandler)

    fastify.post("/addTrackerOrder", addTrackerOrderHandler)
}