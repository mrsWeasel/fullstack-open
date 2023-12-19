import data from "../../data/patients";
import { NonSensitivePatient, Patient } from "../types";
import { NewPatient } from "../types/Patient";
import { v4 as uuid } from "uuid";

export const getPatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  data.push(newPatient);
  return newPatient;
};
