import express from "express";
import { getPatients } from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = getPatients();
  res.send(patients);
});

export default router;
