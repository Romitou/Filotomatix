import { config as dotenv } from 'dotenv';
import type { Config } from './typings/config';

export const config: Config = {
    HTTP_PORT: 9090,
    JWT_SECRET: '',
    JWT_EXPIRATION: '1 day',
    BCRYPT_SALT_ROUNDS: 10,
    MONGO_URI: 'mongodb://127.0.0.1/filotomatix',
};

export function loadConfig(): void {
    const env = dotenv();
    if (env?.error) {
        console.log(`There is some problems in the .env file! ${env.error.message}`);
        // eslint-disable-next-line node/no-process-exit
        process.exit(2);
    }
    const { parsed } = env;
    if (!parsed)
        return;
    for (const key of Object.keys(parsed)) {
        if (Object.keys(config).includes(key))
            config[key] = parsed[key];
    }
}
