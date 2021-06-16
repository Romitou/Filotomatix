import bcrypt from 'bcrypt';
import type {
 FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest,
} from 'fastify';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user';
import type { LoginRequest } from '../typings/routers';

const expiresIn = 60 * 60 * 24 * 30; // 30 days

export default function auth(fastify: FastifyInstance, _options: FastifyPluginOptions): FastifyInstance {
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

        const user = { email, isAdmin: existingUser?.admin };
        const accessToken = jsonwebtoken.sign(user, 'privateKey', { expiresIn });
        return reply.send({ accessToken });
    }));

    fastify.get('/self', (async (req: FastifyRequest, reply: FastifyReply) => reply.send({ user: req.user })));
    fastify.get('/logout', (async (req: FastifyRequest, reply: FastifyReply) => reply.send({ status: 'OK' })));

    return fastify;
}
