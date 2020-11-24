import mongoose from 'mongoose';

export default function dbConnect(dbConnectionString: string): Promise<typeof mongoose> {
  return mongoose.connect(
    dbConnectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  );
}
