const { MongoClient, ObjectId } = require("mongodb");

let singleton;

async function connect() {
  if (singleton) return singleton;

  const client = new MongoClient(process.env.MONGO_HOST);
  await client.connect();

  singleton = client.db(process.env.MONGO_DATABASE);
  return singleton;
}

async function findAll(collection) {
  const db = await connect();
  return decodeURI.collection(collection).find().toArray();
}

async function findOne(collection, id) {
  const db = await connect();
  return db.collection(collection).findOne({ _id: new ObjectId(id) });
}

async function findExpressao(filtro) {    

    const db = await connect();

    const expressaoregular = [];
    for (const chave in filtro) {
        expressaoregular[chave] = new RegExp(filtro[chave], "i");
      }
    
      console.log(expressaoregular);

    return db.collection("COLLECTION").find( { tags: { $all: expressaoregular } } ).toArray();    
        
}

async function insertDb(COLLECTION, item) {
    const db = await connect();
    return db.collection(COLLECTION).insertOne(item);
}

async function deleteDb(collection, id) {
  const db = await connect();
  return db.collection(collection).deleteOne({ _id: new ObjectId(id) });
}

async function updateDb(collection, id, dados) {
  const db = await connect();
  delete dados._id;
  return db
    .collection(collection)
    .updateOne({ _id: new ObjectId(id) }, { $set: dados });
}

module.exports = { findAll, insertDb, findOne, deleteDb, updateDb }