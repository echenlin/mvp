import { getAllNews, addNews, deleteNews } from './controllers/index.js';
import express from 'express';

const router = express.Router();

router.get('/', getAllNews);

router.post('/', addNews);

router.delete('/', deleteNews);



export default router;