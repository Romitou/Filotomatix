import express from 'express';
import Ride from '../database/models/Ride';
import calculateWaitingTime from './utils/calculateWaitingTime';

const router = express();

router.route('/rides')
  .get(async (_req, res) => {
    const rides = await Ride.find({});
    rides.forEach(ride => ride.set('waitTimeMins', calculateWaitingTime(ride)));
    res.status(200).json(rides);
  })
  .post(async (req, res) => {
    const { body } = req;
    if (!(body.name && body.image && body.throughput && body.maxReservations))
      return res.status(400).json({ message: 'Des informations sont manquantes afin de créer l\'attraction.' });
    const ride = new Ride({
      name: body.name,
      status: body.status || 'closed',
      image: body.image,
      throughput: body.throughput,
      queueLength: body.queueLength || 0,
      maxReservations: body.maxReservations,
      reservations: body.reservations || 0,
      waitTimeMins: body.waitTimeMins || 0
    });
    await ride.save();
    res.status(200).json({ status: 'OK' });
  });

export default router;
