import { CreateOrder } from "../src/services/order.service.ts"
import { createUser } from "../src/services/user.service.ts"

describe("test user creation", ()=> {
    it("should be able to create a new user!", ()=>{
        
        const user = createUser()

    })
})