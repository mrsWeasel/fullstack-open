import express from "express";
import {
  getPatients,
  addPatient,
  toNewPatient,
  getPatientById,
} from "../services/patientService";
import { parseString } from "../util/validators";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = getPatients();
  res.send(patients);
});

router.get("/:id", (req, res) => {
  const id = parseString(req.params.id);
  const patient = getPatientById(id);
  res.send(patient);
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
