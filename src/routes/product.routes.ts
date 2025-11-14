import type { FastifyInstance } from "fastify"
import { CreateProductSchema, UpdateProductSchema } from "../models/product.schema.ts"
import { createProductHandler, getProductsHandler, updateProductHandler } from "../controllers/product.controller.ts"


export default async function productRoutes(fastify: FastifyInstance) {

    fastify.get("/getProductByKey", getProductsHandler)

    fastify.post("/product", {
        schema: {
            body: CreateProductSchema,
            response: {
                '2xx': {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' }
                    }
                }
                
            }
        }
    }, createProductHandler)

    fastify.put("/update", {
            schema: {
                body: UpdateProductSchema,
                response: {}
            }
        },
        updateProductHandler
    )

    // fastify.delete("/:id", {
    //         schema: {
    //             body: {},
    //             response: {}
    //         }
    //     },
    //     ()=>{}
    // )
}