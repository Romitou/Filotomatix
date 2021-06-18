import type { FastifyRequest } from 'fastify';
import type { RideDocument } from './models';

export interface FilotomatixRequest extends FastifyRequest {
    user: {
        email: string;
        admin: boolean;
    };
}

export interface LoginRequest extends FastifyRequest {
    body: {
        email: string;
        password: string;
    };
}

export interface PatchRideRequest extends FastifyRequest {
    body: RideDocument;
}
