import fastify from "fastify";
import { fullFormats } from "ajv-formats/dist/formats.js";
import {Ajv} from "ajv"
import {userRoutes, productRoutes, orderRoutes} from "./src/routes/index.routes.ts";

import indexRoutes from "./src/routes/index.routes.ts";
import authenticate from "./src/plugins/authenticate.ts"; 
import db from "./src/plugins/db.ts";


const app = fastify({
    // logger: true
});


// options for schema validator

const ajv =  new Ajv({
  removeAdditional: 'all',
  useDefaults: false,
  coerceTypes: false,
  formats: fullFormats // this property is for get types from javascript for JSON schema
})


app.setValidatorCompiler(({schema})=>{
    return ajv.compile(schema)
})

app.addHook("onRequest", (req, res, done) => {
    console.log("hook onRequest triggered")
    console.log(`url: ${req.url}`);
    
    done()
})

await app.register(db) // this need to run first to ensure correct dependecy injection of Prisma

// console.log($ref("createUserSchema"))
app.register(authenticate)
// app.register(indexRoutes)
app.register(userRoutes, {prefix: "/v1", })
app.register(productRoutes, {prefix: "/v1"})
// app.register(orderRoutes, {prefix: "/v1/order/"})



app.listen({port:3000}, (err) => {
    if(err) {
        console.log("application error" + err);
    }

    console.log("application ready!")
    console.log(app.printRoutes());
    
    
})