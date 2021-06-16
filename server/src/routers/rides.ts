import type {
 FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest,
} from 'fastify';
import Ride from '../models/ride';
import type { RideDocument } from '../typings/models';
import type { RideRequest } from '../typings/routers';
import waitingTime from '../utils/waitingTime';

export default function rides(fastify: FastifyInstance, _options: FastifyPluginOptions): FastifyInstance {
    fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
        const allRides: RideDocument[] = await Ride.find({});
        for (const ride of allRides)
            ride.waitTimeMins = waitingTime(ride);
        return reply.send(allRides);
    });

    // @ts-expect-error 123456
    fastify.get('/:id', async (req: RideRequest, reply: FastifyReply) => {
        // @ts-expect-error 123456
        const ride: RideDocument = await Ride.find({ _id: req.params.id });
        if (!ride)
            return reply.code(404).send({ message: 'Aucune attraction trouvée via cet identifiant.' });
        ride.waitTimeMins = waitingTime(ride);
        return reply.send(ride);
    });

    return fastify;
}
