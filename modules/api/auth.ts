import express from 'express';
import jsonwebtoken from 'jsonwebtoken';

const router = express();

const refreshTokens: Array<any> = [];
// @ts-ignore - Environmental variables cannot be undefined.
const privateKey: string = process.env.JWT_SECRET;
const expiresIn = 60 * 60 * 24 * 30; // 30 days

function getRandomToken(): number {
  return Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;
}

export function verifyJwtToken(token: string | undefined) {
  try {
    jsonwebtoken.verify((token || '').slice(7), privateKey);
  } catch (e) {
    return false;
  }
  return true;
}

// [POST] /login
router.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Veuillez saisir une adresse mail.' });
  const refreshToken = getRandomToken();

  const user = { email, admin: true };
  const accessToken = jsonwebtoken.sign(user, privateKey, { expiresIn });
  refreshTokens[refreshToken] = { accessToken, user };
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

  const accessToken = jsonwebtoken.sign({ email: user.email, admin: user.admin }, privateKey, { expiresIn });
  refreshTokens[newRefreshToken] = { accessToken, user };
  res.json({ accessToken, refreshToken: newRefreshToken });
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
