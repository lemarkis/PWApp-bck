import dotenv from 'dotenv';
import app from './app';
import dbConnect from './services/db.service';

dotenv.config();

const dbString = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  : 'mongodb://localhost:27017/whatsnext';

dbConnect(dbString).then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
}).catch((err) => {
  console.error('DB error: ', err);
  process.exit(3);
});
