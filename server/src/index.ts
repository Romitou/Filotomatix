import 'dotenv/config';
import fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyJWT from 'fastify-jwt';
import mongoose from 'mongoose';
import { config, loadConfig } from './config';
import authenticate from './decorations/authenticate';
import auth from './routers/auth';
import rides from './routers/rides';

const server: FastifyInstance = fastify({ logger: true });
server.decorate('authenticate', authenticate);

async function start(): Promise<void> {
    loadConfig();
    await mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    await server.register(fastifyCors, { origin: '*' });
    await server.register(fastifyJWT, { secret: config.JWT_SECRET });
    await server.register(auth, { prefix: '/auth' });
    await server.register(rides, { prefix: '/rides' });
    await server.listen(config.HTTP_PORT);
}

void start();
