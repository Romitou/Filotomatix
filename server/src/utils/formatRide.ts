import type { RideDocument } from '../typings/models';
import waitingTime from './waitingTime';

export default function formatRide(ride: RideDocument, publicUse: boolean): RideDocument {
    ride.waitTimeMins = waitingTime(ride);
    if (publicUse) {
        ride.queueLength = null;
        ride.throughput = null;
        ride.reservations = null;
        ride.maxReservations = null;
    }
    return ride;
}
