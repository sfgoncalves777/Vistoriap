const database = require('../database');

const COLLECTION_NAME = 'cars';

const find = (query, sort, projection) => database
  .getCollection(COLLECTION_NAME)
  .find(query)
  .sort(sort)
  .project(projection)
  .toArray();

const findOne = (query) => database
  .getCollection(COLLECTION_NAME)
  .findOne(query);

module.exports = { find, findOne };