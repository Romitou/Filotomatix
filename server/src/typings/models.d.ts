export interface UserDocument extends Document {
    email: string;
    password: string;
    admin: string;
}