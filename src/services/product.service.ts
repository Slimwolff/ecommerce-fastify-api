import { prisma } from "../../prisma/prisma.ts"
import { UpdateProductSchema, type CreateProductInput } from "../models/product.schema.ts";


// produtos tem varias relações 
//tem que criar todas as relações 
async function createProduct(input: CreateProductInput) {


    try {
        // cria o produto para poder vincular o id nas outras tabelas
        const p = await prisma.product.create({
            data: input,
            include: {
                product_variation: {
                    include: {
                        product_variation_options: {
                            include: {
                                product_stock: true
                            }
                        }
                    }
                }
            }
        })

        // // cria variação na Product_variations 
        // prodVar.product_id = _p.id
        // const _prodVar = await prisma.product_variations.create({
        //     data: prodVar
        // }) 

        // // cria opções da variação na Product_variations_options
        // prodVarOpt.product_variations_id = _prodVar.id

        return p
    } catch (e) {
        console.log(e);
    }
    
}

async function getProductByKey(input: Record<string, any>) {

    try {
        
        const q = { where: {

        }}
        
        if(input["name"]) {
            q.where.name = {
                contains: input["name"],
                mode: "insensitive"
            }
        }

        if(input["id"]) {
            q.where.id = parseInt(input["id"])
        }

        q.include = {
            product_variation: {
                include: {
                    product_variations_options: {
                        include: {
                            product_stock: true
                        }
                    }
                }
            }

        }
        
        console.log(q);
        
        const p = await prisma.product.findMany(q)

        return p

    } catch(e) {
        console.log(e);
        return { "ERROR": "can't find anything! \n"+e }
    }
}

async function getAllProducts(input: Record<string, any>) {
    try {
        const p = await prisma.product.findMany()

        console.log(p);

        return p
    } catch (e) {
        console.log(e);
    }
    
}

async function updateProduct(input: Record<string, undefined | string | number | boolean>) {
    try {
        const prod = prisma.product.update({
            where: {
                id: input.id
            }, data: input
        })

        return prod
    } catch (e) {
        return e
    }
}

export {
    createProduct,
    getProductByKey,
    updateProduct
}
