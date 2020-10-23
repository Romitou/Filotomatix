export default function unauthorizedError(err: any, req: any, res: any, next: any) {
  if (err.name === 'UnauthorizedError')
    return res.status(err.status).send({
      message: req.headers.authorization
        ? 'Votre jeton d\'authentification est invalide.'
        : 'Aucun jeton d\'authentification n\'a été trouvé dans la requête.'
    });
  next();
}
