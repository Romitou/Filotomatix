/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any */

export interface Config {
    [key: string]: any;
    HTTP_PORT: number;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    BCRYPT_SALT_ROUNDS: number;
    MONGO_URI: string;
}
