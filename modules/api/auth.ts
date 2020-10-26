import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import User from '../database/models/User';

const router = express();

const refreshTokens: Array<any> = [];
// @ts-ignore - Environmental variables cannot be undefined.
const privateKey: string = process.env.JWT_SECRET;
const roundSalt: number = parseInt(process.env.SALT_ROUND || '0');
const expiresIn = 60 * 60 * 24 * 30; // 30 days

// [POST] /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'Veuillez saisir une adresse mail.' });
  const existingUser = await User.findOne({ mail: email });
  if (existingUser) {
    if (!await bcrypt.compare(password, existingUser.get('password'))) {
      return res.status(400).json({ message: 'Le mot de passe associé à ce compte est invalide.' });
    }
  } else {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(roundSalt));
    const newUser = new User({
      mail: email,
      password: hashedPassword
    });
    await newUser.save();
  }

  const refreshToken: any = uuid();

  const user = { email, isAdmin: existingUser?.get('isAdmin') || false };
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
  const newRefreshToken: any = uuid();
  refreshTokens[refreshToken] = undefined;

  const accessToken = jsonwebtoken.sign({ email: user.email, isAdmin: user.isAdmin }, privateKey, { expiresIn });
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
