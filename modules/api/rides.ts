import express from 'express';
import Ride from '../database/models/Ride';

const router = express();

router.get('/', async (_req, res) => {
  const rides = await Ride.find({}, ['name', 'status', 'image', 'throughput', 'queueLength']);
  rides.forEach(ride => ride.set('waitTimeMins', Math.round(ride.get('queueLength') * 60 / ride.get('throughput'))));
  res.status(200).json(rides);
});

router.get('/:id', async (req, res) => {
  let ride;
  try {
    ride = await Ride.findOne({ _id: req.params.id }, ['name', 'status', 'image', 'throughput', 'queueLength']);
  } catch (e) {
    res.status(404).json({ message: 'Aucune attraction trouvée via cet identifiant.' });
  } finally {
    ride?.set('waitTimeMins', Math.round(ride.get('queueLength') * 60 / ride.get('throughput')));
    res.status(200).json(ride);
  }
});

export default router;
