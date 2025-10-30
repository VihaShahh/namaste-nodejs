import { MongoClient } from "mongodb";

const URL = "mongodb+srv://vihashah1103:vihaShah%401103@namstenodejs.2dppwza.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(URL);
const dbName = "helloworld";

async function main() {
  try {
    await client.connect();
    console.log(" Connected successfully to MongoDB Atlas");
    const db = client.db(dbName);
    const collection = db.collection("hello");
    console.log(" Using collection:", collection.collectionName);
  } catch (err) {
    console.error(" Connection error:", err);
  } finally {
    await client.close();
  }
}

main();
