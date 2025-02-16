import { getConnection } from "./Db.js";

const createTable = async () => {
  const connection = await getConnection();
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE
    )
  `);
  await connection.end();
};

const createUser = async (name, email) => {
  const connection = await getConnection();
  const [result] = await connection.execute(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  await connection.end();
  return result.insertId;
};

const getUsers = async () => {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM users');
  await connection.end();
  return rows;
};

const updateUser = async (id, name, email) => {
  const connection = await getConnection();
  await connection.execute(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
  );
  await connection.end();
};

const deleteUser = async (id) => {
  const connection = await getConnection();
  await connection.execute('DELETE FROM users WHERE id = ?', [id]);
  await connection.end();
};

export { createTable, createUser, getUsers, updateUser, deleteUser };