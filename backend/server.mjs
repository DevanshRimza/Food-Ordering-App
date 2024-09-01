import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
app.use(cors());
// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Food Delivery API Backend!');
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3000');
});

// Existing route for fetching restaurant data
app.get('/api/restaurants', async (req, res) => {
  try {
    const response = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.97210&lng=72.82460&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
        // You might also need to add other headers like 'Referer', 'Accept-Language', etc.
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error response body:', errorBody);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Swiggy:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Start the server
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.get('/api/menu/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.97210&lng=72.82460&restaurantId=${restaurantId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error response body:', errorBody);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching menu data from Swiggy:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


/*
const express = require('express');
const axios = require('axios');
const app = express();
const port = 1234; // or any other port you prefer

app.use(express.json());

// Proxy route to Swiggy's backend
app.get('/api/swiggy/restaurants', async (req, res) => {
  try {
    const swiggyResponse = await axios.get('https://www.swiggy.com/dapi/restaurants/list/v5', {
      params: {
        lat: req.query.lat || '18.97210',  // Default latitude if not provided
        lng: req.query.lng || '72.82460',  // Default longitude if not provided
        'is-seo-homepage-enabled': req.query['is-seo-homepage-enabled'] || 'true',
        page_type: req.query.page_type || 'DESKTOP_WEB_LISTING'
      }
    });

    // Check if the response is in JSON format
    if (swiggyResponse.headers['content-type']?.includes('application/json')) {
      res.json(swiggyResponse.data);
    } else {
      res.status(500).send('Error: Expected JSON response from Swiggy API');
    }

  } catch (error) {
    console.error('Error fetching data from Swiggy API:', error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
*/