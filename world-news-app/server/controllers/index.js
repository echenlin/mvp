import { getAll, addOne } from '../models/index.js';

const getAllNews = async (req, res) => {
  // console.log('req', req);
  try {
    const data = await getAll();
    console.log('getdata', data)
    res.status(200).send(data)
  } catch (error) {
    console.log(error);
  }
};

const addNews = async (req, res) => {
  try {
    // console.log('req', req.body)
    await addOne(req.body)
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
}

export { getAllNews, addNews }