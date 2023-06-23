require('dotenv');
const logger = require('npmlog');
const app = require('./lib/app');
const database = require('./lib/database');

const uriMongoDB = process.env.MONGODB;
const port = process.env.PORT;

(async () => {
  try {
    logger.info('[APP] - Iniciando a aplicação');
    app.listen(port || 3333);
    await database.connect(uriMongoDB);
    logger.info('[APP] - Aplicação inicializada');
  } catch (err) {
    logger.error('[APP] - Falha ao incializar a aplicação. Error:', JSON.stringify(err, ['message', 'stack']));
    throw err;
  }
})();
