const { Product } = require('../models');

const productData = [
  { product_name: 'Laptop', price: 999.99, stock: 10, category_id: 1 },
  { product_name: 'T-Shirt', price: 19.99, stock: 20, category_id: 2 },
  { product_name: 'Book', price: 9.99, stock: 5, category_id: 3 },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
