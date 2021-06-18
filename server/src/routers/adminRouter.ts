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
        await Ride.findOneAndUpdate({
            _id: ride._id,
        }, {
            name: req.body.name,
            status: req.body.status,
            image: req.body.image,
            description: req.body.description,
            position: req.body.position,
            restrictions: req.body.restrictions,
            throughput: req.body.throughput,
            queueLength: req.body.queueLength,
            maxReservations: req.body.maxReservations,
            reservations: req.body.reservations,
            waitTimeMins: req.body.waitTimeMins,
            openingTime: req.body.openingTime,
            closingTime: req.body.closingTime,
        });
        return reply.code(200);
    });

    return fastify;
}
