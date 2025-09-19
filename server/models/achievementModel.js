const db = require('../../config/db');

const getAllItems = async () => {
  const result = await db.query('select * From achievements;');
  return result.rows;
};

const addItem = async (title, description, requiredscore) => {
  const result = await db.query(
    'insert into achievements(title, description, requiredscore) values($1, $2, $3) returning *',
    [title, description, requiredscore]
  );
  return result.rows[0];
};

const deleteItem = async (id) => {
  const result = await db.query(
    'delete from achievements where id = $1 returning *;', 
    [id]
  );
  return result.rows[0];
}

module.exports = { getAllItems, addItem, deleteItem }