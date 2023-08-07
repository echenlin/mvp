import { getAll, addOne, deleteOne } from '../models/index.js';

const getAllNews = async (req, res) => {
  // console.log('req', req);
  try {
    const data = await getAll();
    // console.log('getdata', data)
    res.status(200).send(data)
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const addNews = async (req, res) => {
  try {
    // console.log('req', req.body)
    await addOne(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const deleteNews = async (req, res) => {
  try {
    await deleteOne(req.body);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export { getAllNews, addNews, deleteNews }