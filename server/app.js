import createError from 'http-errors';
import express from 'express';
import awsRouter from './routes/aws.js';
import cors from "cors";

const app = express();
const PORT = 3005;
app.use(cors());

app.use('/', awsRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(PORT, function () {
  console.log('Database is listening on port ' + PORT + '!');
});


export default app;
