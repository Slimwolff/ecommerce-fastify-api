import { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";
 import { createProduct, getProductByKey, updateProduct } from "../services/product.service.ts";
import type { CreateProductInput, CreateProductSchema, UpdateProductInput } from "../models/product.schema.ts";

let sessions = {
    "1234": {}
}

async function getProductsHandler(
    req: FastifyRequest, 
    rep: FastifyReply
) {
    try {
        const query =  await { ...req.query }
        
        if(query["id"] || query["name"]) {

            const p = await getProductByKey(query)
            return rep.code(200).send(p)

        } else {

            return rep.code(400).send()

        }
    } catch (e) {
        return rep.code(500).send({ msg: `internal error: ${e}`})
    }
}


async function createProductHandler(req: FastifyRequest, rep: FastifyReply) {

    try {
        const body = await req.body
        
        const product = await createProduct(body)

        console.log(product);       

        return rep.code(200).send(product)    
    } catch (e) {
        rep.log.error(e)
        return rep.code(500).send({msg: "internal server error: 500"})
    }   
}

async function updateProductHandler(req: FastifyRequest<{Body: UpdateProductInput}>, rep: FastifyReply) {
    try {
        const body = req.body

        const updatedProd = await updateProduct(body)

        return rep.code(200).send(updatedProd)
    } catch (e) {
        return rep.code(500).send("server internal error code 500!\n"+e)
    }
}


export {
    getProductsHandler,
    createProductHandler,
    updateProductHandler
}