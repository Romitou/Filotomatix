import express from 'express';
import bodyParser from 'body-parser';
import rides from './rides';
import auth from './auth';

const router = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use((req, res, next) => {
  Object.setPrototypeOf(req, router.request);
  Object.setPrototypeOf(res, router.response);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  req.res = res;
  res.req = req;
  next();
});

router.use('/rides', rides);
router.use('/auth', auth);

export default {
  path: '/api',
  handler: router
};
