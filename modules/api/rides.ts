import express from 'express';
import Ride from '../database/models/Ride';

const router = express();

router.get('/', async (_req, res) => {
  const rides = await Ride.find({}, ['name', 'status', 'image', 'throughput', 'queueLength']);
  rides.forEach(ride => ride.set('waitTimeMins', Math.round(ride.get('queueLength') * 60 / ride.get('throughput'))));
  res.status(200).json(rides);
});

export default router;
