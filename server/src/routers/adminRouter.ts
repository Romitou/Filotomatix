import type {
    FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest,
} from 'fastify';
import Ride from '../models/ride';
import type { RideDocument } from '../typings/models';
import type { PatchRideRequest } from '../typings/routers';
import formatRide from '../utils/formatRide';

export default function adminRouter(fastify: FastifyInstance, _options: FastifyPluginOptions): FastifyInstance {
    fastify.get('/rides', {
        // @ts-expect-error 123456
        preValidation: [fastify.admin],
    }, async (req: FastifyRequest, reply: FastifyReply) => {
        const allRides: RideDocument[] = await Ride.find({});
        const r = allRides.map(ride => formatRide(ride, false));
        return reply.send(r);
    });

    fastify.patch('/rides', {
        // @ts-expect-error 123456
        preValidation: [fastify.admin],
        // @ts-expect-error 123456
    }, async (req: PatchRideRequest, reply: FastifyReply) => {
        const ride: RideDocument | null = await Ride.findOne({ _id: req.body._id });
        if (!ride)
            return reply.code(404).send({ message: 'Cette attraction n\'est pas enregistrée dans la base de données.' });
        await Ride.findOneAndUpdate({ _id: ride._id, }, { $set: req.body });
        return reply.code(200).send({ message: 'Vos modifications ont été enregistrées.' });
    });

    return fastify;
}
