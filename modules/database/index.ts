import MongoClient from './MongoClient';

export default function() {
  // @ts-ignore
  this.nuxt.hook('ready', async() => {
    const mongoClient = new MongoClient(process.env.MONGO_URI || 'mongodb://127.0.0.1/filotomatix');
    await mongoClient.login();
  });
}
