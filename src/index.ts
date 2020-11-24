import dotenv from 'dotenv';
import app from './app';
import dbConnect from './services/db.service';

dotenv.config();

dbConnect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`).then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
}).catch((err) => {
  console.error('DB error: ', err);
  process.exit(3);
});
