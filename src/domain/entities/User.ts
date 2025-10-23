export class User<T> {
    constructor(
        private readonly id: Number,
        private first_name: String,
        private last_name: String,
        private birthdate: Date,
        private gender: String,
        private address: Record<string, any>,
        private email: String,
        private password: String,
    ) {}

    updatePassword(newPassword: string): void {
        if(newPassword.length < 8) {
            throw new Error("Password must be at least 8 characters long.")
        }
        this.password = newPassword
    }

    data() {
        const { password, ...data } = this;
        return data;
    }
    
    
}

export type CreateUserDTO = {
    first_name: String;
    last_name: String;
    birthdate: Date;
    gender: String;
    address: Record<string, any>;
    email: String;
    password: String;
}

export type UpdateUserDTO = Partial<CreateUserDTO>;