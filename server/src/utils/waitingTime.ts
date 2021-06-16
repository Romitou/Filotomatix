import type { RideDocument } from '../typings/models';

export default function waitingTime(ride: RideDocument): number {
    return Math.round((ride.queueLength * 60) / ride.throughput);
}
