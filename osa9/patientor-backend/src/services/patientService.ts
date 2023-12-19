import data from "../../data/patients";
import { NonSensitivePatient, Patient, NewPatient } from "../types";
import { v4 as uuid } from "uuid";
import { parseGender, parseString } from "../util/validators";

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
  return {
    id: uuid(),
    ...patient,
  };
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("data is missing or invalid");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "ssn" in object &&
    "occupation" in object
  ) {
    return {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseString(object.ssn),
      occupation: parseString(object.occupation),
    };
  }

  throw new Error("some fields are missing from data");
};
