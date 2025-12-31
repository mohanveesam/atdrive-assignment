const db = require('../config/mysql');

exports.createOrder = async (req, res) => {
  const { userId, productIds, totalAmount } = req.body;

  await db.execute(
    'INSERT INTO orders (userId, productIds, totalAmount) VALUES (?,?,?)',
    [userId, JSON.stringify(productIds), totalAmount]
  );

  res.json({ message: 'Order created' });
};
exports.getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;

  const [rows] = await db.execute(
    'SELECT * FROM orders WHERE userId=?',
    [userId]
  );

  const orders = rows.map(o => ({
    ...o,
    productIds: o.productIds ? JSON.parse(o.productIds) : []
  }));

  res.json(orders);
};
exports.updateOrder = async (req, res) => {
  const { productIds, totalAmount } = req.body;

  await db.execute(
    'UPDATE orders SET productIds=?, totalAmount=? WHERE orderId=?',
    [JSON.stringify(productIds), totalAmount, req.params.id]
  );

  res.json({ message: 'Order updated' });
};
exports.deleteOrder = async (req, res) => {
  await db.execute(
    'DELETE FROM orders WHERE orderId=?',
    [req.params.id]
  );

  res.json({ message: 'Order deleted' });
};
