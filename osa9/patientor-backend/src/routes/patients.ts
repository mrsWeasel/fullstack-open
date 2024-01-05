import express from "express";
import {
  getPatients,
  addPatient,
  toNewPatient,
  getPatientById,
  toEntry,
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

router.post("/:id/entries", (req, res) => {
  try {
    const id = parseString(req.params.id);
    const patient = getPatientById(id);
    const entries = patient?.entries ?? [];

    const newEntry = toEntry(req.body);
    console.log(newEntry);
    if (patient) {
      res.send({ ...patient, entries: [...entries, newEntry] });
    } else {
      res.status(404).send({ error: "no patient found" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "error adding entry" });
  }
});

export default router;
