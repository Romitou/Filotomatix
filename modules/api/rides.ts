import express from 'express';
import Ride from '../database/models/Ride';

const app = express();

app.get('/', async (_req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const rides = await Ride.find({}, ['name', 'status', 'image', 'throughput', 'queueLength']);
  rides.forEach(ride => ride.set('waitTimeMins', Math.round(ride.get('queueLength') * 60 / ride.get('throughput'))));
  res.status(200).json(rides);
});

export default app;
