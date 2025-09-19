const db = require('../../config/db');

const getAllItems = async () => {
  const result = await db.query(`Select wr.id, u.username, rp.name as rpName, wt.name as wtName, wr.quantity From wastereports as wr
    Left Join users as u On wr.userid = u.id
    Left Join recyclingpoints rp on wr.recyclingpointid = rp.id
    Left Join wastetypes wt on wr.wastetypeid = wt.id;`);
  return result.rows;
};

const addItem = async (userid, recyclingpointid, wastetypeid, quantity) => {
  const result = await db.query(
    'insert into wastereports(userid, recyclingpointid, wastetypeid, quantity) values($1, $2, $3, $4) returning *',
    [userid, recyclingpointid, wastetypeid, quantity]
  );
  return result.rows[0];
};

const deleteItem = async (id) => {
  const result = await db.query(
    'delete from wastereports where id = $1 returning *;', 
    [id]
  );
  return result.rows[0];
}

module.exports = { getAllItems, addItem, deleteItem }