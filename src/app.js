const express = require('express');
const app = express();
const port = 8080; 

const ProductManager = require('../admin/ProductManager.js'); 

const productManager = new ProductManager('products.json');

app.use(express.json());

app.get('/products', (req, res) => {
  const { limit } = req.query;

  const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();

  res.json(products);
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);

  const product = productManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

