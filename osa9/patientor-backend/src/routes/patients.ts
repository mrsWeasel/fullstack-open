import express from "express";
import {
  getPatients,
  addPatient,
  toNewPatient,
} from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = getPatients();
  res.send(patients);
});

router.post("/", (req, res) => {
  try {
    const patientData = toNewPatient(req.body);

    const newPatient = addPatient(patientData);

    res.json(newPatient);
  } catch (error) {
    res.status(400).send({ error: "error adding patient" });
  }
});

export default router;
