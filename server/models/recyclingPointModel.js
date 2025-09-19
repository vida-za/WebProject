const db = require('../../config/db');

const getAllItems = async () => {
  const result = await db.query('Select * From recyclingpoints;');
  return result.rows;
};

const addItem = async (name, address) => {
  const result = await db.query(
    'Insert into recyclingpoints(name, address) Values($1, $2) Returning *',
    [name, address]
  );
  return result.rows[0];
};

const deleteItem = async (id) => {
  const result = await db.query(
    'Delete from recyclingpoints where id = $1 Returning *;', 
    [id]
  );
  return result.rows[0];
}

module.exports = { getAllItems, addItem, deleteItem }