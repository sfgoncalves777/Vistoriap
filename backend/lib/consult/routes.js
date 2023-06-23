const { findInfos, findConsultant } = require('./consult-controller');

const consultRoutes = (router) => {
  router.get('/consultant/infos', findInfos);
  router.get('/consultant/:state/:city', findConsultant);
};

module.exports = { consultRoutes };
