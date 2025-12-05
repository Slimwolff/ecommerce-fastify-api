import { PrismaClient } from "@prisma/client/extension";
import { UpdateProductInput, UpdateProductSchema, 
    type CreateProductInput 
} from "../models/product.schema.ts";



export default class ProductServiceImpl {
    private prisma: PrismaClient;

    constructor(prismaClient) {
        this.prisma = prismaClient
    }

    async create(input: CreateProductInput) {

         const prod = await this.prisma.product.create({
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

        console.log(prod);
        

        return prod
    }

    async getProductById(input: number) {
        const prod = await this.prisma.product.findUnique({
            where: {
                id: input
            }
        })

        return prod
    }

    async updateProduct(input: UpdateProductInput) {
        const prod = await this.prisma.product.update({
            where: {
                id: parseInt(input.id)
            },
            data: input
        })

        return prod
    }

}
