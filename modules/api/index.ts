import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import rides from './rides';
import auth from './auth';
import unauthorizedError from './middlewares/unauthorizedError';
import headers from './middlewares/headers';

const router = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use(jwt({
  // @ts-ignore - Environmental variables cannot be undefined.
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
}).unless({
  path: [
    '/api/auth/login',
    '/api/auth/refresh',
    new RegExp('api\\/(?!auth|admin)')
  ]
}));

router.use(headers);
router.use(unauthorizedError);

router.use('/rides', rides);
router.use('/auth', auth);

export default {
  path: '/api',
  handler: router
};
