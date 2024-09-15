import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'ManmeetSingh', // Replace with your MySQL username
  password: 'your_mysql_password', // Replace with your MySQL password
  database: 'krishi', // Your database name
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.log('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Endpoint to post a new bid (POST request)
app.post('/api/postBid', (req, res) => {
  const { userId, name, role, details, timeline } = req.body;
  const query = 'INSERT INTO bids (userId, name, role, details, timeline) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [userId, name, role, details, timeline], (err, result) => {
    if (err) {
      console.log('Error posting bid:', err);
      res.status(500).send('Error posting bid');
    } else {
      res.send({ id: result.insertId });
    }
  });
});

// Endpoint to fetch all bids (GET request)
app.get('/api/getAllBids', (req, res) => {
  const query = 'SELECT * FROM bids ORDER BY createdAt DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.log('Error fetching bids:', err);
      res.status(500).send('Error fetching bids');
    } else {
      res.send(results);
    }
  });
});

// Endpoint to fetch bids by a specific user (GET request)
app.get('/api/getUserBids/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM bids WHERE userId = ? ORDER BY createdAt DESC';
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.log('Error fetching user bids:', err);
      res.status(500).send('Error fetching user bids');
    } else {
      res.send(results);
    }
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
