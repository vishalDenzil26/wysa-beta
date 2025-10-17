import { MongoClient, ObjectId } from "mongodb";
import fs from "fs";
import path from "path";

const uri = process.env.DATABASE_URI!;
const dbName = "prime";
const dataDir = new URL("./data", import.meta.url).pathname;

function transformObjectIds(obj) {
  if (Array.isArray(obj)) {
    return obj.map(transformObjectIds);
  } else if (obj && typeof obj === "object") {
    if (obj.$oid) {
      return new ObjectId(obj.$oid);
    }

    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = transformObjectIds(value);
    }
    return newObj;
  }
  return obj;
}

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log("Connected to MongoDB");

    const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));

    for (const file of files) {
      const collectionName = path.basename(file, ".json");
      const filePath = path.join(dataDir, file);
      const rawData = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(rawData);

      if (!Array.isArray(data) || data.length === 0) {
        console.warn(`⚠️ Skipping ${file}: no valid array data`);
        continue;
      }

      // 🔄 Convert $oid fields into real ObjectIds
      const transformedData = transformObjectIds(data);

      const collection = db.collection(collectionName);
      await collection.deleteMany({});
      await collection.insertMany(transformedData);

      console.log(`✅ Seeded ${transformedData.length} docs into "${collectionName}"`);
    }

    console.log("🎉 All collections seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await client.close();
  }
}

seed();
