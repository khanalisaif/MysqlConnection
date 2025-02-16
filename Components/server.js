import express from 'express';
import { createTable, createUser, getUsers, updateUser, deleteUser } from './Model.js';
import { createDatabase } from './Db.js';

const app = express();
const PORT = 5000;


app.use(express.json());


const initialize = async () => {
    await createDatabase(); 
  await createTable();
  console.log('Database and table initialized');
};
initialize();


app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const userId = await createUser(name, email);
  res.status(201).json({ id: userId, name, email });
});


app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
});


app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  await updateUser(id, name, email);
  res.status(200).json({ id, name, email });
});


app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await deleteUser(id);
  res.status(204).send();
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});