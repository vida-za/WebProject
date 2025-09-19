const model = require('../models/reportModel');

const getItems = async (req, res) => {
  try {
    const items = await model.getAllItems();
    res.status(200).json({ status: 'ok', items: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

const createItem = async (req, res) => {
    console.log(req.body);
    try {
        const { userid, recyclingpointid, wastetypeid, quantity } = req.body;
        const newItem = await model.addItem(userid, recyclingpointid, wastetypeid, quantity);
        res.status(201).json({ status: 'ok', item: newItem });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const oldItem = await model.deleteItem(id);
        res.status(200).json({ status: 'ok', item: oldItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
}

module.exports = { getItems, createItem, deleteItem };