import { ObjectId } from "mongodb";

export interface DataDocument {
  _id?: ObjectId;
  content: string;
}