import type { FastifyReply, FastifyRequest } from 'fastify';
import type { FilotomatixRequest } from '../typings/routers';

export default async function admin(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
        await req.jwtVerify();
        const filoReq = req as FilotomatixRequest;
        if (!filoReq.user?.admin)
            void reply.code(403).send({ error: 'You do not have authorization to access this resource.' });
    } catch (error: unknown) {
        void reply.code(401).send({ error });
    }
}
