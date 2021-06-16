import type { FastifyRequest } from 'fastify';

export interface LoginRequest extends FastifyRequest {
    body: {
        email: string;
        password: string;
    };
}
