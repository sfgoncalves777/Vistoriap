(() => {
  const vistoriapdb = db.getSiblingDB('vistoriap');
  const collectionCars = vistoriapdb.getCollection('cars');
  const example = {
    gold: true || false,
    model: '',
    value: 0,
    year: '',
    kms: 0,
    fullModel: '',
    location: {
      state: '',
      city: ''
    },
    salesman: '',
    photoLink: '',
    albumLink: '',
    email: '',
    whatsapp: '',
    reportLink: '',
    fuel: '',
    doors: '',
    repaiting: '',
    tires: {
      brand: '',
      kms: 0
    },
    exchange: '',
    glasses: '',
    headlights: '',
    revision: {
      date: '',
      kms: 0
    },
    optionals: ['']
  };
  const car = {};
  try {
    const insertedCar = collectionCars.insertOne(car);
    printjson(insertedCar)
  } catch (err) {
    prinjson(err);
  }
})()