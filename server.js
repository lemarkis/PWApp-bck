console.log('\x1b[32m', 'Creating server...', '\x1b[0m');
const express = require('express');
const app = express();

// Request logger
const morgan = require('morgan');
app.use(morgan("dev"));

// CORS
process.stdout.write("\x1b[32m" + "Configuring CORS... " + "\x1b[0m");
const cors = require('cors');
const whitelist = ['http://localhost:3000', 'netlify.domaine']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
console.log('\x1b[32m' + 'Done !' + '\x1b[0m');

// JWT
process.stdout.write('\x1b[32m' + 'Configuring JWT... ' + '\x1b[0m');
const jwtCheck = require('./utils/JwtCheck');
app.use(jwtCheck);
console.log('\x1b[32m' + 'Done !' + '\x1b[0m');

// API Routes
process.stdout.write('\x1b[32m' + 'Applying routers... ' + '\x1b[0m');
const apiRouter = require('./routes/api.router');
app.use('/api', apiRouter);
console.log('\x1b[32m' + 'Done !' + '\x1b[0m');

// Starting...
const port = process.env.PORT || 3001;
app.listen(port, () => console.log('\x1b[32m' + `Starting on port: ${port}` + '\x1b[0m'));