import { Type as t, type Static  } from "@sinclair/typebox";

const CreateProductSchema = t.Object({
    name: t.String(),
    description: t.String(),
    product_variations: t.Optional(t.Object({
        create: t.Array(t.Object({
            variation_name: t.String(),
            product_variations_options: t.Optional(t.Object({
                create: t.Array(t.Object({
                    name: t.String(),
                    variationImg: t.String(),
                    sku: t.String(),
                    product_stock: t.Optional(t.Object({
                        create: t.Object({
                            total_stock: t.Number(),
                            unit_price: t.Number(),
                            total_price: t.Number()
                        })
                    }))
                }))
            }))
        }))
    }))
})

const UpdateProductSchema = t.Object({
    id: t.Number(),
    name: t.Optional(t.String()),
    description: t.Optional(t.String()),
    product_variations: t.Optional(t.Object({
        update: t.Array(t.Object({
            variation_name: t.Optional(t.String()),
            product_variations_options: t.Optional(t.Object({
                update: t.Array(t.Object({
                    name: t.Optional(t.String()),
                    variationImg: t.Optional(t.String()),
                    sku: t.Optional(t.String()),
                    product_stock: t.Optional(t.Object({
                        update: t.Object({
                            total_stock: t.Optional(t.Number()),
                            unit_price: t.Optional(t.Number()),
                            total_price: t.Optional(t.Number())
                        })
                    }))
                }))
            }))
        }))
    }))
})


type CreateProductInput = Static<typeof CreateProductSchema>
type UpdateProductInput = Static<typeof UpdateProductSchema>

export {
    CreateProductSchema,
    UpdateProductSchema,
    type CreateProductInput,
    type UpdateProductInput
}
