import productRoutes from "./product.routes.ts";
import userRoutes from "./user.routes.ts";
import { orderRoutes } from "./order.routes.ts";
import fp from "fastify-plugin";

export default fp(async function (fastify, opts) {
    fastify.register(userRoutes, {prefix: '/v1'})
}, {
    name: 'initRoutes'
})

// export {
//     productRoutes,
//     userRoutes,
//     orderRoutes
// }