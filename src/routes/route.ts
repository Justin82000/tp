import { Router } from "express";
import {
  addData,
  listData,
  updateData,
  deleteData,
} from "../crud/crud.ts";

const router = Router();

router.post("/addData", addData);
router.get("/list", listData);
router.put("/updateData/:id", updateData);
router.delete("/deleteData/:id", deleteData);

export default router;
