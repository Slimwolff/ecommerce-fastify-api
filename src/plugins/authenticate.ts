import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";



function authentication(fastify: FastifyInstance, opts, done) {
    
    fastify.decorate("auth", ()=>{
        console.log(`from decorate authentication`);
        
    })

    fastify.addHook("onClose", (fastify, done) => {
        console.log("closing hook plugin");
        
    })

    done()
}

export default fp(authentication)