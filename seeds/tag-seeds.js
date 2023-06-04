const { Tag } = require('../models');

const tagData = [
  { tag_name: 'Electronics' },
  { tag_name: 'Fashion' },
  { tag_name: 'Technology' },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
