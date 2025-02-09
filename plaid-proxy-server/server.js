const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

const PLAID_URL = 'https://sandbox.plaid.com';
const CLIENT_ID = '67a733d57e8580001feb9d80';
const SECRET = '55530f12d340d450af6ffe65332c7d';

let accessToken = 'mock_access_token'; // Mock access token for testing

// Mocked Transaction Data
const mockTransactions = [
  {
    date: '2023-01-01',
    name: 'Transaction 1',
    category: ['Food'],
    amount: 10.0,
  },
  {
    date: '2023-01-02',
    name: 'Transaction 2',
    category: ['Transportation'],
    amount: 20.5,
  },
  {
    date: '2023-01-03',
    name: 'Transaction 3',
    category: ['Entertainment'],
    amount: 30.75,
  },
];

// Create Public Token
app.post('/createPublicToken', async (req, res) => {
  try {
    // Simulate creating public token
    res.json({ public_token: 'mock_public_token' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Exchange Public Token for Access Token
app.post('/exchangePublicToken', async (req, res) => {
  const { public_token } = req.body;
  try {
    // Simulate exchange for access token
    res.json({ access_token: 'mock_access_token' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Mock Fetch Transactions
app.post('/getTransactions', async (req, res) => {
  const { startDate, endDate } = req.body;
  try {
    // Return mocked transactions for testing
    res.json(mockTransactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
