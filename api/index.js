import express from 'express';

const router = new express.Router();
const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/rides', async (_req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.status(200).json([
    {
      name: 'La Maison de la Peur',
      status: 'closed',
      image: 'https://cache.filevirtuelle.parcasterix.fr/api/api/guest/rides/aef3ad0b-41b4-4c49-bc66-0af7969e3fc2/images/0',
      throughput: 540,
      queueLength: 648,
      maxReservations: 100,
      reservations: 100,
      waitTimeMins: Math.round(60 * 648 / 540)
    },
    {
      name: 'Oziris',
      status: 'full',
      image: 'https://cache.filevirtuelle.parcasterix.fr/api/api/guest/rides/d6545906-ffa0-4553-8ea1-a0e2682f8174/images/0',
      throughput: 540,
      queueLength: 648,
      maxReservations: 100,
      reservations: 100,
      waitTimeMins: Math.round(60 * 648 / 540)
    },
    {
      name: "La colère d'Anubis",
      status: 'open',
      image: 'https://cache.filevirtuelle.parcasterix.fr/api/api/guest/rides/1dbe8b51-3e6b-486d-be4a-f792dce1cc2f/images/0',
      throughput: 315,
      queueLength: 648,
      maxReservations: 100,
      reservations: 100,
      waitTimeMins: Math.round(60 * 648 / 315)
    },
    {
      name: 'Goudurix',
      status: 'open',
      image: 'https://cache.filevirtuelle.parcasterix.fr/api/api/guest/rides/1fbeb7fc-e218-4c9b-9818-d1093c072e35/images/0',
      throughput: 765,
      queueLength: 0,
      maxReservations: 100,
      reservations: 100,
      waitTimeMins: Math.round(60 * 0 / 765)
    }
  ])
})

router.get('*', (_req, res) => {
  res.status(404).json({ message: 'Invalid endpoint' })
})

export default {
  path: '/api',
  handler: router
}
