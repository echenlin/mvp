import { MongoClient } from 'mongodb';

let db;
console.log('start')

const connectDb = async () => {
  // if connected, return
  if (db) {
    return db;
  }
  const client = await MongoClient.connect('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  console.log('connected to mongodb!')
  db = client.db('mvp');
  return db
};

const getAll = async () => {
  try {
    const db = await connectDb();
    const collection = db.collection('news');
    return collection.find().toArray();
  } catch (error) {
    console.log(error);
  }
};

const addOne = async (data) => {
  try {
    const db = await connectDb();
    const collection = db.collection('news');
    return collection.insertOne(data);
  } catch (error) {
    console.log(error);
  }
};

const deleteOne = async (data) => {
  try {
    const db = await connectDb();
    const collection = db.collection('news');
    return collection.deleteOne(data);
  } catch (error) {
    console.log(error)
  }
};


export { getAll, addOne, deleteOne }