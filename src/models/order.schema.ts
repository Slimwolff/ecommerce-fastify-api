import type { Status } from "@prisma/client";
import { Type as t, type Static} from "@sinclair/typebox";

const CreateOrderSchema = t.Object({
    user_id: t.Number(),
    orderItems: t.Optional(t.Object({
        create: t.Array(t.Object({
            product_id: t.Number(),
            quantity: t.Number(),
            unit_price: t.Number(),
        }))
    })),
    shipping_address: t.Optional(t.String()),
    billing_address: t.Optional(t.String()),
    total_price: t.Number(),
    payment_method: t.String(),
    transation: t.Optional(t.String()),
    coupon_id: t.Optional(t.String())
})


interface changeOrderInput {
    where: {
        id: number
    },
    data: Record<string, Status>;
}

type CreateOrderInput = Static<typeof CreateOrderSchema>

export {
    CreateOrderSchema,
    type CreateOrderInput
}