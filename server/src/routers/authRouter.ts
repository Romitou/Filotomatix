import bcrypt from 'bcrypt';
import type {
 FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest,
} from 'fastify';
import jsonwebtoken from 'jsonwebtoken';
import QRCode from 'qrcode';
import { config } from '../config';
import User from '../models/user';
import type { FilotomatixRequest, LoginRequest } from '../typings/routers';

export default function authRouter(fastify: FastifyInstance, _options: FastifyPluginOptions): FastifyInstance {

    // @ts-expect-error 123456
    fastify.post('/login', (async (request: LoginRequest, reply: FastifyReply) => {
        const { email, password } = request.body;
        if (!email)
            return reply.status(400).send({ message: 'Veuillez saisir une adresse mail.' });
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (!await bcrypt.compare(password, existingUser.password))
                return reply.status(400).send({ message: 'Le mot de passe associé à ce compte est invalide.' });
        } else {
            const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(12));
            const newUser = new User({
                email,
                password: hashedPassword,
            });
            await newUser.save();
        }

        const user = { email, admin: existingUser?.admin ?? false };
        const accessToken = jsonwebtoken.sign(user, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION });
        return reply.send({ accessToken });
    }));

    fastify.get('/self', {
        // @ts-expect-error 123456
        preValidation: [fastify.authenticate],
    }, (async (req: FastifyRequest, reply: FastifyReply) => reply.send({ user: req.user })));

    fastify.get('/qrcode', {
        // @ts-expect-error 123456
        preValidation: [fastify.authenticate],
        // @ts-expect-error 123456
    }, async (req: FilotomatixRequest, reply: FastifyReply) => {
        const qrCode = await QRCode.toDataURL(req.user.email);
        return reply.send({ qrCode });
    });

    fastify.get('/logout', (async (req: FastifyRequest, reply: FastifyReply) => reply.send({ status: 'OK' })));

    return fastify;
}
