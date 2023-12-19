import express from "express";
import { getPatients, addPatient } from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = getPatients();
  res.send(patients);
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatient = addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  console.log(newPatient);

  res.json(newPatient);
});

export default router;
