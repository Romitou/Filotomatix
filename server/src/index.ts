import 'dotenv/config';
import fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyJWT from 'fastify-jwt';
import mongoose from 'mongoose';
import { config, loadConfig } from './config';
import admin from './decorations/admin';
import authenticate from './decorations/authenticate';
import adminRouter from './routers/adminRouter';
import authRouter from './routers/authRouter';
import rideRouter from './routers/rideRouter';

const server: FastifyInstance = fastify({ logger: true });
server.decorate('authenticate', authenticate);
server.decorate('admin', admin);

async function start(): Promise<void> {
    loadConfig();
    await mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    await server.register(fastifyCors, { origin: '*' });
    await server.register(fastifyJWT, { secret: config.JWT_SECRET });
    await server.register(adminRouter, { prefix: '/admin' });
    await server.register(authRouter, { prefix: '/auth' });
    await server.register(rideRouter, { prefix: '/rides' });
    await server.listen(config.HTTP_PORT);
}

void start();
