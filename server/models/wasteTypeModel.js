const db = require('../../config/db');

const getAllItems = async () => {
  const result = await db.query('select * From wastetypes;');
  return result.rows;
};

const addItem = async (name, description, ecoscore) => {
  const result = await db.query(
    'insert into wastetypes(name, description, ecoscore) values($1, $2, $3) returning *',
    [name, description, ecoscore]
  );
  return result.rows[0];
};

const deleteItem = async (id) => {
  const result = await db.query(
    'delete from wastetypes where id = $1 returning *;', 
    [id]
  );
  return result.rows[0];
}

module.exports = { getAllItems, addItem, deleteItem }