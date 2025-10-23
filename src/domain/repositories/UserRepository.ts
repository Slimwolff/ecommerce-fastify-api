export interface IUserRepository {
    create(data: CreateUserDTO): Promise<User>
    findById(id: string): Promise<User | null>
    update(id: string, data: UpdateUserDTO): Promise<User | null>
    delete(id: string): Promise<void>
}