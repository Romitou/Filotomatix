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
    throughput: number;
    queueLength: number;
    maxReservations: number;
    reservations: number;
    waitTimeMins: number;
    openingTime: string;
    closingTime: string;
}
