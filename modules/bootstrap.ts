import { config } from '../app.config';
import MongoClient from './database/MongoClient';

export default function() {
  // @ts-ignore
  this.nuxt.hook('ready', async() => {
    const mongoClient = new MongoClient(config.mongoUri);
    await mongoClient.login();
  });
}
