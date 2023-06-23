const logger = require('npmlog');
const repository = require('./consult-repository');

const findInfos = async (req, res) => {
  try {
    let result = [];
    const infos = await repository.find(
      {},
      { 'locations.state': 1,  'locations.city': 1 },
      { locations: 1, _id: 0 }
    );
    for (let i = 0; i < infos.length; i++) {
      const { locations } = infos[i];
      for (let j = 0; j < locations.length; j++) {
        const existStateInResult = result.find(info => info.state === locations[j].state);
        if (existStateInResult) {
          if (!existStateInResult.cities.find(city => city === locations[j].city)) {
            existStateInResult.cities.push(locations[j].city);
          }
        } else {
          result.push({ state: locations[j].state, cities: [locations[j].city] });
        }
      }
    }
    return res.json(result);
  } catch (err) {
    logger.error('Error on findInfos consultant. Error', JSON.stringify(err, ['stack', 'message']));
    return res.sendStatus(500);
  }
};

const findConsultant = async (req, res) => {
  try {
    const { state, city } = req.params;
    const result = await repository.find(
      { locations: { state, city } },
      { gold: -1 },
      { email: 0 }
    );
    return res.json(result);
  } catch (err) {
    logger.error('Error on findConsultant. Error', JSON.stringify(err, ['stack', 'message']));
    return res.sendStatus(500);
  }
};

module.exports = { findInfos, findConsultant };
