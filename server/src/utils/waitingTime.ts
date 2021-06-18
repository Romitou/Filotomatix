import type { RideDocument } from '../typings/models';

export default function waitingTime(ride: RideDocument): number {
    return Math.round(((ride.queueLength ?? 0) * 60) / (ride.throughput ?? 1));
}
