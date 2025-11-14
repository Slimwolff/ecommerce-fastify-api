import type { FastifyReply, FastifyRequest } from "fastify"
import type { CreateOrderInput } from "../models/order.schema.ts"
import { AddTrackerOrder, CreateOrder,GetOrderById,GetOrderByUserId } from "../services/order.service.ts"
import { Null } from "@sinclair/typebox"


export async function getOrderById(req: FastifyRequest, res: FastifyReply) {
    res.status(201).send({"hello": "test"})
}

export async function createOrderHandler(
    req: FastifyRequest<{
        Body: CreateOrderInput
    }>, 
    res: FastifyReply) {
    
    try {

        const body = req.body

        const user = await CreateOrder(body)

        return res.code(201).send(user)

    } catch (e: any) {
        
        console.log(e)

        if ( e.name == "PrismaClientKnownRequestError") {
            return res.code(500).send(e)
        }

        return res.code(500)
    }
}

export async function getOrderByUserHandler(req: FastifyRequest, rep: FastifyReply) {

    try {

        const userId = req.query.id

        const orders = await GetOrderByUserId(userId)

        return rep.code(200).send(orders)

    } catch (e) {
        return rep.code(400).send({error: e})
    }

}

export async function getOrderByIdHandler(req: FastifyRequest, rep: FastifyReply) {
    try {
        
        const orderId: number = parseInt(req.query.id)
        
        if( typeof orderId == "number" && !Number.isNaN(orderId) ) {

            const order = await GetOrderById(orderId)

            return rep.code(200).send(order)

        }

        return rep.code(400).send("provide an numeric order ID")

    } catch (e) {
        return rep.code(500).send("server internal error code 500")
    }
}


// this method require higher role permission for use
// permission needs to be validated 
export async function changeOrderStatusHandler(req: FastifyRequest, rep: FastifyReply) {
    try {

        const order = req.body

        const orderChanged = await changeOrderStatus(order)

        return rep.code(200).send(orderChanged)

    } catch (e) {
        return rep.code(500).send("server internal error code 500")
    }
}

// method to add transport code tracker for order 
export async function addTrackerOrderHandler(req: FastifyRequest, rep: FastifyReply) {
    try {
        
        const order = req.body

        const orderChanged = await AddTrackerOrder(order)

        return rep.code(200).send(orderChanged)

    } catch (e) {
        return rep.code(500).send("server internal error code 500")
    }
}