const database = require('../database');

const COLLECTION_NAME = 'consultants';

const find = (query, sort, projection) => database
  .getCollection(COLLECTION_NAME)
  .find(query)
  .sort(sort)
  .project(projection)
  .toArray();
;

module.exports = { find };
