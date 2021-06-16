import { model, Schema } from 'mongoose';
import type { RideDocument } from '../typings/models';

const rideSchema = new Schema<RideDocument>({
    name: String,
    status: String,
    image: String,
    description: String,
    position: String,
    restrictions: [String],
    throughput: Number,
    queueLength: Number,
    maxReservations: Number,
    reservations: Number,
    waitTimeMins: Number,
    openingTime: Date,
    closingTime: Date,
});

export default model<RideDocument>('Ride', rideSchema);
