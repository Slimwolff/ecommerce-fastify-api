import type { FastifyInstance } from "fastify"
import { CreateProductSchema, UpdateProductSchema } from "../models/product.schema.ts"
import { createProductHandler, getProductsHandler, updateProductHandler } from "../controllers/product.controller.ts"
import ProductServiceImpl from "../services/product.service.ts"


const productRoutes = async (fastify: FastifyInstance) => {

    if(!fastify.prisma) { throw new Error("Ensure prisma client it's running first!!")}

    const productService = new ProductServiceImpl(fastify.prisma)

    fastify.decorate("productService", productService)

    fastify.route({
        method: 'GET',
        url: '/getProductByKey:id',
        handler: async function (req, rep) {
            const prod = await fastify.productService.getProductById(parseInt(req.query.id))
            if(!prod) {return new Error("none products found! ")}
            return rep.code(200).send(prod)
        }
    })
    fastify.get("/getProductByKey/:id", getProductsHandler)

    fastify.route({
        method: 'POST',
        url: "/product",
        // preHandler: (ctx)=>{console.log(`preHandler product post route -> ${ctx}`);
        // },
        schema: {
            body: CreateProductSchema
        },
        handler: async function(req, rep) {
            const prod = await fastify.productService.create(req.body)
            // if(!prod) { rep.code(500);return new Error("internal server error") }
            return rep.code(200).send(prod)
        }
    })

    // edit and change products
    fastify.route({
        method: 'PUT',
        url: "/update",
        schema: {
                body: UpdateProductSchema,
                response: {
                    '2xx': {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                            updated_at: {type: 'string',format: 'date-time'}
                        }

                    }
                }
                
            },
        handler: async function (req,rep) {
            try {
                const prod = await this.productService.updateProduct(req.body)  
                console.log(prod);
                return rep.code(200).send(prod)
            } catch (e) {
                console.log("Internal Server Error");
                return rep.code(500).send("Internal Server Error")
            }
        }
    })

    // fastify.delete("/:id", {
    //         schema: {
    //             body: {},
    //             response: {}
    //         }
    //     },
    //     ()=>{}
    // )
}
export default productRoutes