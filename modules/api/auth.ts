import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'express-jwt';

const router = express();

router.use(
  jwt({
    // @ts-ignore - Environmental variables cannot be undefined.
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
  }).unless({
    path: ['/api/auth/login', '/api/auth/refresh']
  })
);

const refreshTokens: Array<any> = [];
// @ts-ignore - Environmental variables cannot be undefined.
const privateKey: string = process.env.JWT_SECRET;
const expiresIn = 60 * 60 * 24 * 30; // 30 days

function getRandomToken(): number {
  return Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;
}

// [POST] /login
router.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error('invalid mail');
  const refreshToken = getRandomToken();

  const accessToken = jsonwebtoken.sign({ email }, privateKey, { expiresIn });
  refreshTokens[refreshToken] = { accessToken, user: { email } };
  res.json({ accessToken, refreshToken });
});

// [POST] /refresh
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!(refreshToken in refreshTokens))
    res.sendStatus(401);
  const { user } = refreshTokens[refreshToken];
  const newRefreshToken = getRandomToken();
  refreshTokens[refreshToken] = undefined;

  const accessToken = jsonwebtoken.sign({ email: user.email }, privateKey, { expiresIn });
  refreshTokens[newRefreshToken] = { accessToken, user };
  res.json({ token: { accessToken, refreshToken: newRefreshToken } });
});

// [GET] /user
router.get('/user', (req, res) => {
  // @ts-ignore - Managed by JWT
  res.json({ user: req.user });
});

// [POST] /logout
router.post('/logout', (_req, res) => {
  res.json({ status: 'OK' });
});

export default router;
