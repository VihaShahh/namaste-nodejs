import { MongoClient } from "mongodb";

// MongoClient is what you use to connect to MongoDB Atlas.
const URL = "mongodb+srv://vihashah1103:vihaShah%401103@namstenodejs.2dppwza.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(URL);
const dbName = "helloworld";

async function main() {
    try {
        // 🔹 1. CONNECT to MongoDB Atlas
        await client.connect();
        console.log(" Connected successfully to MongoDB Atlas");

        // 🔹 2. SELECT the database and collection
        const db = client.db(dbName);
        const collection = db.collection("hello");
        console.log(" Using collection:", collection.collectionName);

        // 🔹 3. INSERT DOCUMENTS
        const data = [
            { name: "Smitu", age: 21, city: "Morbi" },
            { name: "Viha", age: 22, city: "Anand" },
            { name: "Chinmay", age: 23, city: "Indore" },
        ];

        const insertResult = await collection.insertMany(data);
        console.log(" Inserted documents =>", insertResult.insertedCount);

        // 🔹 4. FIND ALL DOCUMENTS
        const allDocs = await collection.find({}).toArray();
        console.log(" All documents =>", allDocs);

        // 🔹 5. FIND SPECIFIC DOCUMENTS
        const findOne = await collection.findOne({ name: "Viha" });
        console.log(" Found one =>", findOne);

        const findMany = await collection.find({ name: "Viha" }).toArray();
        console.log(" Found all documents where name = Viha =>", findMany);


        // 🔹 6. UPDATE DOCUMENTS
        const updateResult = await collection.updateOne(
            { name: "Smitu" },            // filter
            { $set: { city: "Rajkot" } }  // update
        );
        console.log(" Updated documents =>", updateResult.modifiedCount);
        const updateManyResult = await collection.updateMany(
            { city: "Anand" },                // filter condition
            { $set: { city: "Vadodara" } }    // fields to update
        );
        console.log(" Updated many =>", updateManyResult.modifiedCount);


        // 🔹 7. DELETE DOCUMENTS
        const deleteResult = await collection.deleteOne({ name: "Chinmay" });
        console.log(" Deleted documents =>", deleteResult.deletedCount);

        // 🔹 8. COUNT DOCUMENTS
        const count = await collection.countDocuments();
        console.log(" Total documents in collection =>", count);

    } catch (err) {
        console.error(" Connection error:", err);
    } finally {
        // 🔹 9. CLOSE CONNECTION
        await client.close();
        console.log(" Connection closed");
    }
}

main();
