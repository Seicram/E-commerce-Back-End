const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      await product.addTags(req.body.tagIds);
      const updatedProduct = await Product.findByPk(product.id, {
        include: [
          Category,
          {
            model: Tag,
            through: ProductTag,
          },
        ],
      });
      res.status(201).json(updatedProduct);
    } else {
      res.status(201).json(product);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!product[0]) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    if (req.body.tagIds) {
      const updatedProduct = await Product.findByPk(req.params.id, {
        include: [
          Category,
          {
            model: Tag,
            through: ProductTag,
          },
        ],
      });
      await updatedProduct.setTags(req.body.tagIds);
    }
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
