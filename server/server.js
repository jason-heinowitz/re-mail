const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 8080;

const auth = require('./routes/auth');
const emails = require('./routes/email');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/auth', auth);
app.use('/api', emails);

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  app.listen(3000); //listens on port 3000 -> http://localhost:3000/
}

// catch all
app.use('*', (req, res, next) =>
  next({
    code: 404,
    message: 'Sorry - this resource cannot be found.',
    log: `User failed request: ${req.method} - ${req.originalUrl}`,
  })
);

app.use((err, req, res, next) => {
  // err MUST be in format: { code: status code, message: message to user, log: message to server operator }
  console.log(err.log);
  return res.status(err.code).json(err.message);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
