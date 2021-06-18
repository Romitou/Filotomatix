export interface UserDocument extends Document {
    email: string;
    password: string;
    admin: string;
}

export interface RideDocument extends Document {
    name: string;
    status: string;
    image: string;
    description: string;
    position: string;
    restrictions: string[];
    throughput: number | null;
    queueLength: number | null;
    maxReservations: number | null;
    reservations: number | null;
    waitTimeMins: number;
    openingTime: string;
    closingTime: string;
}
