import { MongoClient } from "mongodb";
//MongoClient is what you use to connect to a MongoDB server/Atlas cluster and perform operations.

const URL = "mongodb+srv://vihashah1103:vihaShah%401103@namstenodejs.2dppwza.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(URL);
const dbName = "helloworld";

async function main() {
  try {
    await client.connect();
    console.log(" Connected successfully to MongoDB Atlas");
//     this connects your Node.js app to MongoDB Atlas.
// client is like a phone .
// client.connect() means you are dialing the MongoDB server.
// await means “wait until the connection is complete.”
// If the connection works, it moves to the next line.
// If it fails (wrong password, bad internet, etc.), it goes to the catch block.

    const db = client.db(dbName);
//     Now that you’re connected, you need to choose which database to work with.
// MongoDB Atlas can hold many databases inside one cluster.
// “Use the database named helloworld.”
// If it doesn’t exist yet, MongoDB will create it automatically the first time you insert data.
//  Think of it like opening a folder inside a storage drive.

    const collection = db.collection("hello");
//     Inside a database, you have collections — similar to tables in SQL.

// So this means:

// “Open the collection named hello inside the database helloworld.”

// If “hello” doesn’t exist yet, MongoDB will create it the first time you insert something.
    console.log(" Using collection:", collection.collectionName);

    //insert document
    const data ={
        name: "smitu",
        age: 21,
        city: "morbi"
    }
const insertResult = await collection.insertMany([data])
console.log("insert", insertResult)
    //find all documents in the collection
    const findResult = await collection.find({}).toArray();
    console.log(
        "found docs", findResult
    )
  } catch (err) {
    console.error(" Connection error:", err);
  } finally {
    await client.close();
  }
}

main();
