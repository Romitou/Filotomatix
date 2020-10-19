import mongoose from 'mongoose';

export default class MongoClient {
  uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  async login(): Promise<void> {
    await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
}
