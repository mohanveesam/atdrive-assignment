const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/mysql');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE username=?',
    [username]
  );

  if (!rows.length) return res.status(401).json({ message: 'Invalid user' });

  const valid = await bcrypt.compare(password, rows[0].password);
  if (!valid) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign(
    { userId: rows[0].id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // res.json({ token });
  res.json({
    token,
    id: rows[0].id,
    username: rows[0].username
  });
};

exports.register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  const hash = await bcrypt.hash(password, 10);
  await db.execute(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hash]
  );
  res.json({ message: 'User registered successfully' });
};

