import express, { Router } from 'express';
import Ride from '../database/models/Ride';

// @ts-ignore
const index: Router = new Router();
const app = express();
index.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

index.get('/rides', async(_req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const rides = await Ride.find({}, ['name', 'status', 'image', 'throughput', 'queueLength']);
  rides.forEach(ride => ride.set('waitTimeMins', Math.round(ride.get('throughput') * 60 / ride.get('queueLength'))));
  res.status(200).json(rides);
});

index.get('*', (_req, res) => {
  res.status(404).json({ message: 'Invalid endpoint.' });
});

export default {
  path: '/api',
  handler: index
};
