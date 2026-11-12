import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getCollection } from "../config/server";

// POST
export const addData = async (req: Request, res: Response): Promise<void> => {
  try {
    const collection = getCollection();
    const result = await collection.insertOne({ content: req.body.data });
    res.json({ message: "Data added successfully", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET
export const listData = async (req: Request, res: Response): Promise<void> => {
  try {
    const collection = getCollection();
    const list = await collection.find().toArray();
    res.json({ list });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT
export const updateData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    const collection = getCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { content: req.body.data } }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE
export const deleteData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    const collection = getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
