import { PrismaClient } from "@prisma/client/extension"
import type { CreateUserInput } from "../models/user.schema.ts"
import { hashPassword } from "../utils/hash.ts"
import { Prisma, User } from "@prisma/client"


export interface userService {
    create(input: CreateUserInput): Promise<User>,
    getUserById(id: Number): Promise<User>
}

export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input

    const { hash, salt } = hashPassword(password)

        const user = await prisma.user.create({
            data: { ...rest, salt, password: hash }
        })   

        console.log(user);
        
        return user
}


export default class UserServiceImpl {

    private prisma: Prisma;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient
    }

    async create(input: CreateUserInput) {

        const { password, ...rest } = input

        const { hash, salt } = hashPassword(password)

        const user = await this.prisma.user.create({
            data: { ...rest, salt, password: hash }
        })

        return user
    }

    async getUserById(userid) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userid
            }
        })

        return user
    }
    
}