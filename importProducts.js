const axios = require('axios');
const path = require('path');
const productsData = require(path.join(__dirname, 'client', 'src', 'data', 'products.js'));

const API_URL = 'http://localhost:5000/api/products';

async function importProducts() {
  const products = productsData.products || productsData;
  for (const product of products) {
    // Remove 'id' field if present
    const { id, ...rest } = product;
    try {
      const res = await axios.post(API_URL, rest);
      console.log(`Imported: ${res.data.name}`);
    } catch (err) {
      console.error(`Failed to import ${product.name}:`, err.response?.data || err.message);
    }
  }
}

importProducts();
