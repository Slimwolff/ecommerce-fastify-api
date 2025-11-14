import type { Status } from "@prisma/client";
import { prisma } from "../../prisma/prisma.ts";
import type { CreateOrderInput } from "../models/order.schema.ts";

async function CreateOrder(input: CreateOrderInput) {

    try {
        const order = await prisma.order.create({
            data: input
        })    

        console.log(order);

        return order
        
    } catch (e) {
        console.log(e)
    }
}

async function GetOrderByUserId(userId: number) {
    try {
        const orders = await prisma.order.findMany({
            where: {
                user_id: userId
            }
        })

        return orders

    } catch (e) {
        console.log(
            `ERROR::GetOrderByUserId::  ${e}`   
        );
        return e
    }
}

async function GetOrderById(orderId: number) {
    try {
        const order = prisma.order.findUnique({
            where: {
                id: orderId
            }
        })
        return order
    } catch (e) {
        console.log(e);
        return e
    }
}

async function ChangeOrderStatus(order: Record<string, any>) {

    try {
        const orderChanged = prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: order.status
            }
        })

        return orderChanged
    } catch (e) {
        return Error("error: "+e)
    }
}

async function AddTrackerOrder(order: Record<string, any>) {

    try {
        const orderChanged = prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: order.status
            }
        })
        return orderChanged
    } catch (e) {
        return Error("error: "+e)
    }
}



export {
    CreateOrder,
    GetOrderByUserId,
    GetOrderById,
    ChangeOrderStatus,
    AddTrackerOrder
}

