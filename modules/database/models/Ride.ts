import mongoose from 'mongoose';

export default mongoose.model('Ride',
  new mongoose.Schema({
    name: String,
    status: String,
    image: String,
    throughput: Number,
    queueLength: Number,
    maxReservations: Number,
    reservations: Number,
    waitTimeMins: Number,
    openingTime: Date,
    closingTime: Date
  })
);
