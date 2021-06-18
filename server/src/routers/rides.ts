import type {
 FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest,
} from 'fastify';
import Ride from '../models/ride';
import type { RideDocument } from '../typings/models';
import type { RideRequest } from '../typings/routers';
import formatRide from '../utils/formatRide';

export default function rides(fastify: FastifyInstance, _options: FastifyPluginOptions): FastifyInstance {
    fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
        const allRides: RideDocument[] = await Ride.find({});
        console.log(allRides);
        const r = allRides.map(ride => formatRide(ride, true));
        return reply.send(r);
    });

    // @ts-expect-error 123456
    fastify.get('/:id', async (req: RideRequest, reply: FastifyReply) => {
        // @ts-expect-error 123456
        const ride: RideDocument = await Ride.findOne({ _id: req.params.id });
        if (!ride)
            return reply.code(404).send({ message: 'Aucune attraction trouvée via cet identifiant.' });
        return reply.send(formatRide(ride, true));
    });

    return fastify;
}
