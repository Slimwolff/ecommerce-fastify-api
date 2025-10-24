import fastify from "fastify";
import userRoutes from "./src/routes/user.routes.js"

const app = fastify();

app.register(userRoutes, {prefix: "/v1"})

app.listen({port:3000}, (err) => {
    if(err) {
        console.log("application error" + err);
    }

    console.log("application ready!")
    
})