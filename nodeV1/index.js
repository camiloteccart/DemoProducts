//npm install express mysql bcrypt  jsonwebtoken
//const express = require('express')
import express from 'express';
import pool from "./config/pool.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World in express')
});

// Secret key for JWT
const secretKey = 'your_secret_key';
const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token.replace(/^Bearer\s/, ''), secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = decoded;
    next();
  });
};

app.get('/products', verifyToken, (req, res) => {
  // Get products from the database
  pool.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error('Error retrieving products:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

        // If products are found, return them as JSON
        res.json(results);
    });
});

app.post('/create', verifyToken, (req, res) => {
  const { price, description, image, name } = req.body;

    if (!price || !description || !image || !name) {
        return res.status(400).json({ error: 'some information is missing' });
    }

    // Insert the product into the database
    pool.query('INSERT INTO products (price, description, image, name) VALUES (?, ?, ?, ?)', [price, description, image, name], (error, results) => {
        if (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // If insertion is successful, return status 'ok'
        res.json({ status: 'ok' });
    });
});

app.post('/delete', verifyToken, (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  // Delete the product from the database
  pool.query('DELETE FROM products WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if a record was deleted
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // If deletion is successful, return status 'successful'
    res.json({ status: 'ok' });
  });
});

app.put('/update', verifyToken, (req, res) => {
  const { id, price, description, image, name } = req.body;

  if (!id || !price || !description || !image || !name) {
    return res.status(400).json({ error: 'ID, price, description, image, name are required' });
  }

  // Update the product in the database
  pool.query('UPDATE products SET price = ?, description = ?, image = ?, name = ? WHERE id = ?', [price, description, image, name, id], (error, results) => {
    if (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if a record was updated
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // If update is successful, return status 'successful'
    res.json({ status: 'ok' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if user exists in the database
  pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error checking user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // User exists, compare hashed password
    const user = results[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!result) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Passwords match, create a JWT token
      const token = jwt.sign({ email: email }, secretKey, { expiresIn: '1h' });

      // Return the token in a JSON response
      res.json({ token: token });
    });
  });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is working on port ${port}`)
});