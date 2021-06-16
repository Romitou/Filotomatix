import { model, Schema } from 'mongoose';
import type { UserDocument } from '../typings/models';

const userSchema = new Schema<UserDocument>({
    email: String,
    password: String,
    admin: Boolean,
});

export default model<UserDocument>('User', userSchema);
