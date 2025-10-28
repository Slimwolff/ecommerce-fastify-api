import fastify from "fastify";
import userRoutes from "./src/routes/user.routes.js"

const app = fastify({
    logger: true
});

app.addHook("onRequest", (req, res, done) => {
    console.log("hook onRequest triggered")
    done()
})

app.register(userRoutes, {prefix: "/v1"})

app.listen({port:3000}, (err) => {
    if(err) {
        console.log("application error" + err);
    }

    console.log("application ready!")
    
})