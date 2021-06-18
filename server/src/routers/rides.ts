import type {
 FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest,
} from 'fastify';
import Ride from '../models/ride';
import type { RideDocument } from '../typings/models';
import formatRide from '../utils/formatRide';

export default function rides(fastify: FastifyInstance, _options: FastifyPluginOptions): FastifyInstance {

    fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
        const allRides: RideDocument[] = await Ride.find({});
        const r = allRides.map(ride => formatRide(ride, true));
        return reply.send(r);
    });

    return fastify;
}
