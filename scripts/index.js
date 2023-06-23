const fs = require('fs');
const { parse } = require('csv-parse');

const path = './input/consultores.csv';
const consultants = [];
const states = {
  'AC': 'Acre',
  'AL': 'Alagoas',
  'AM': 'Amazonas',
  'AP': 'Amapá',
  'BA': 'Bahia',
  'CE': 'Ceará',
  'DF': 'Distrito Federal',
  'ES': 'Espírito Santo',
  'GO': 'Goiás',
  'MA': 'Maranhão',
  'MG': 'Minas Gerais',
  'MS': 'Mato Grosso do Sul',
  'MT': 'Mato Grosso',
  'PA': 'Pará',
  'PB': 'Paraíba',
  'PE': 'Pernambuco',
  'PI': 'Piauí',
  'PR': 'Paraná',
  'RJ': 'Rio de Janeiro',
  'RN': 'Rio Grande do Norte',
  'RO': 'Rondônia',
  'RR': 'Roraima',
  'RS': 'Rio Grande do Sul',
  'SC': 'Santa Catarina',
  'SE': 'Sergipe',
  'SP': 'São Paulo',
  'TO': 'Tocantins'
}

const buildLocations = (infoLocations) => {
  const locations = [];
  const splitInfoLocations = infoLocations.trim().split(',');
  for (let i = 0; i < splitInfoLocations.length; i++) {
    const infoLocation = splitInfoLocations[i];
    const infoSplictLocation = infoLocation.split('/');
    locations.push({ state: states[infoSplictLocation[1]], city: infoSplictLocation[0] });
  }
  return locations
}

const buildConsult = (line) => {
  return {
    name: line[0],
    contact: line[1],
    email: line[2],
    locations: buildLocations(line[3])
  }
}

const stream = fs.createReadStream(path);
const parser = parse();
stream.pipe(parser);
parser.on('data', (line) => consultants.push(buildConsult(line)));
parser.on('end', () => console.log(JSON.stringify(consultants)));
