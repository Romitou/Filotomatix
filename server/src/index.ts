import 'dotenv/config';
import fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyJWT from 'fastify-jwt';
import mongoose from 'mongoose';
import authenticate from './decorations/authenticate';

const server: FastifyInstance = fastify({ logger: true });
server.decorate('authenticate', authenticate);

async function start(): Promise<void> {
    await mongoose.connect(process.env.MONGO_URI ?? 'mongodb://127.0.0.1/filotomatix', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    await server.register(fastifyCors, { origin: '*' });
    await server.register(fastifyJWT, { secret: 'JWT_SECRET' });
    await server.listen(7070);
}

void start();
