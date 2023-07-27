import { getAllNews, addNews } from './controllers/index.js';
import express from 'express';

const router = express.Router();

router.get('/', getAllNews);

router.post('/', addNews);



export default router;