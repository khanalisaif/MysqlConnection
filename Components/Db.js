import mysql from 'mysql2/promise';

const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root', 
  });

  await connection.query('CREATE DATABASE IF NOT EXISTS saifali_db');
  await connection.end();
};

const getConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root', 
    database: 'saifali_db',
  });
};

export { createDatabase, getConnection };