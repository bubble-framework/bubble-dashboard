import { createError } from 'http-errors';
import express from 'express';
import usersRouter from './routes/aws.js';

const app = express();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(3000, function () {
  console.log('Example app listening on port ' + port + '!');
});

export default app;
