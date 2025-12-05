import type { PrismaClient, Status } from "@prisma/client";
import type { CreateOrderInput } from "../models/order.schema.ts";

export default class orderService {
    private prisma: PrismaClient;

    constructor(prismaClient) {
        this.prisma = prismaClient
    }

    async CreateOrder(input: CreateOrderInput) {

        try {
            const order = await this.prisma.order.create({
                data: input
            })    

            console.log(order);

            return order
            
        } catch (e) {
            console.log(e)
        }
    }


    // get my orders
    async GetOrderByUserId(userId: number) {
        try {
            const orders = await this.prisma.order.findMany({
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

    async GetOrderById(orderId: number) {
        try {
            const order = this.prisma.order.findUnique({
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

    async ChangeOrderStatus(order: Record<string, any>) {
        try {
            const orderChanged = this.prisma.order.update({
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

    async AddTrackerOrder(order: Record<string, any>) {

        try {
            const orderChanged = this.prisma.order.update({
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
}