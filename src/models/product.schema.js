"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductSchema = exports.CreateProductSchema = void 0;
var typebox_1 = require("@sinclair/typebox");
var CreateProductSchema = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    product_variations: typebox_1.Type.Optional(typebox_1.Type.Object({
        create: typebox_1.Type.Array(typebox_1.Type.Object({
            variation_name: typebox_1.Type.String(),
            product_variations_options: typebox_1.Type.Optional(typebox_1.Type.Object({
                create: typebox_1.Type.Array(typebox_1.Type.Object({
                    name: typebox_1.Type.String(),
                    variationImg: typebox_1.Type.String(),
                    sku: typebox_1.Type.String(),
                    product_stock: typebox_1.Type.Optional(typebox_1.Type.Object({
                        create: typebox_1.Type.Object({
                            total_stock: typebox_1.Type.Number(),
                            unit_price: typebox_1.Type.Number(),
                            total_price: typebox_1.Type.Number()
                        })
                    }))
                }))
            }))
        }))
    }))
});
exports.CreateProductSchema = CreateProductSchema;
var UpdateProductSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    product_variations: typebox_1.Type.Optional(typebox_1.Type.Object({
        update: typebox_1.Type.Array(typebox_1.Type.Object({
            variation_name: typebox_1.Type.Optional(typebox_1.Type.String()),
            product_variations_options: typebox_1.Type.Optional(typebox_1.Type.Object({
                update: typebox_1.Type.Array(typebox_1.Type.Object({
                    name: typebox_1.Type.Optional(typebox_1.Type.String()),
                    variationImg: typebox_1.Type.Optional(typebox_1.Type.String()),
                    sku: typebox_1.Type.Optional(typebox_1.Type.String()),
                    product_stock: typebox_1.Type.Optional(typebox_1.Type.Object({
                        update: typebox_1.Type.Object({
                            total_stock: typebox_1.Type.Optional(typebox_1.Type.Number()),
                            unit_price: typebox_1.Type.Optional(typebox_1.Type.Number()),
                            total_price: typebox_1.Type.Optional(typebox_1.Type.Number())
                        })
                    }))
                }))
            }))
        }))
    }))
});
exports.UpdateProductSchema = UpdateProductSchema;
function testInput(input) {
    for (var _i = 0, _a = Object.entries(input); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        console.log("key: ".concat(key, " | value: ").concat(value));
    }
}
testInput(UpdateProductInput);
