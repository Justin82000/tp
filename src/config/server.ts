import { MongoClient, Collection } from "mongodb";
import { DataDocument } from "../type/data";

const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(mongoUrl);

let collection: Collection<DataDocument>;

export async function connectDB() {
  await client.connect();
  collection = client.db("test").collection<DataDocument>("ma_collection");
  console.log("Connecté à MongoDB");
}

export function getCollection() {
  if (!collection) {
    throw new Error("La base de données n'est pas initialisée.");
  }
  return collection;
}
