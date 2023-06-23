const { findInfos, findCars, findCar } = require('./car-controller');

const carRoutes = (router) => {
  router.get('/car/infos', findInfos);
  router.get('/car', findCars);
  router.get('/car/:car_id', findCar);
};

module.exports = { carRoutes };
