import express from "express";
import { deleteOrganization } from "../controllers/organization.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.delete("/:id", verifyToken,deleteOrganization);

export default router;
