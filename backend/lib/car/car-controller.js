const logger = require('npmlog');
const { ObjectId } = require('mongodb');
const repository = require('./car-repository');

const findInfos = async (req, res) => {
  try {
    const result = [];
    const infos = await repository.find(
      {},
      { model:1, year: -1, 'location.state': 1, 'location.city': 1 },
      { _id: 0, model: 1, year: 1, 'location.state': 1 }
    );
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i];
      const { model, year, location: { state } } = info;
      const existModelInResult = result.find(info => info.model === model);
      if (existModelInResult) {
        const existYearInResult = existModelInResult.years.find(info => info.year === year);
        if (existYearInResult) {
          const existStateInResult = existYearInResult.locattions.find(info => info.state === state);
          if (!existStateInResult) {
            existYearInResult.locattions.push({ state });
          }
        } else {
          existModelInResult.years.push({ year, locattions: [{ state }] });
        }
      } else {
        result.push({ model, years: [{ year, locattions: [{ state }] }] });
      }
    }
    return res.json(result);
  } catch (err) {
    logger.error('Error on findInfos carAds. Error', JSON.stringify(err, ['stack', 'message']));
    return res.sendStatus(500);
  }
}

const findCars = async (req, res) => {
  try {
    const { model, year, state } = req.query;
    const result = await repository.find(
      { model, year, 'location.state': state },
      { gold: -1 },
      { value: 1, year: 1, kms: 1, fullModel: 1, 'location.city': 1, photoLink: 1, reportLink: 1 }
    );
    return res.json(result);
  } catch (err) {
    logger.error('Error on findCars. Error', JSON.stringify(err, ['stack', 'message']));
    return res.sendStatus(500);
  }
};

const findCar = async (req, res) => {
  try {
    const { car_id } = req.params;
    const result = await repository.findOne({ _id: ObjectId(car_id) });
    return res.json(result);
  } catch (err) {
    logger.error('Error on findCar. Error', JSON.stringify(err, ['stack', 'message']));
    return res.sendStatus(500);
  }
};

module.exports = { findInfos, findCars, findCar };
