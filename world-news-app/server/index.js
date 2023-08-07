import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes.js';

const app = express();
app.use(cors())

app.use(morgan('dev'));
app.use(express.json());

// Set up our routes
app.use('/news', router);

const PORT = 5173;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})