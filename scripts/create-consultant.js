(() => {
  const vistoriapdb = db.getSiblingDB('vistoriap');
  const collectionConsultants = vistoriapdb.getCollection('consultants');
  const example = [{
    name: '',
    contact: '',
    email: '',
    locations: [{
      state: '',
      city: ''
    }],
    gold: true || false,
    profileLink: ''
  }];
  const consultants = []
  try {
    const insertedConsultants = collectionConsultants.insertMany(consultants);
    printjson(insertedConsultants)
  } catch (err) {
    prinjson(err);
  }
})()