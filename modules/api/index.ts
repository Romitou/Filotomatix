import express from 'express';
import bodyParser from 'body-parser';
import rides from './rides';

const router = express();

router.use(bodyParser.json());

router.use((req, res, next) => {
  Object.setPrototypeOf(req, router.request);
  Object.setPrototypeOf(res, router.response);
  req.res = res;
  res.req = req;
  next();
});

router.use('/rides', rides);

export default {
  path: '/api',
  handler: router
};
