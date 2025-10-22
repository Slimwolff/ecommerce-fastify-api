import fastify from "fastify";

const app = fastify();

app.listen({port:3000}, (err) => {
    if(err) {
        console.log("application error" + err);
    }

    console.log("application ready!")
    
})