import type { FastifyReply, FastifyRequest } from 'fastify';

export default async function authCheck(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
        await req.jwtVerify();
    } catch (error: unknown) {
        void reply.code(401).send({ error });
    }
}
