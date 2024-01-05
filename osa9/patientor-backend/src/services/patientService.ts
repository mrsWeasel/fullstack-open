import data from "../../data/patients";
import { NonSensitivePatient, Patient, NewPatient, Entry } from "../types";
import { v4 as uuid } from "uuid";
import {
  parseDiagnosisCodes,
  parseEntryDischarge,
  parseEntryHealthCheckRating,
  parseEntryType,
  parseGender,
  parseString,
} from "../util/validators";

export const getPatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

export const getPatientById = (id: string): NonSensitivePatient | undefined => {
  return data.find((p) => p.id === id);
};

export const addPatient = (patient: NewPatient): Patient => {
  return {
    id: uuid(),
    entries: [],
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

export const toEntry = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("data is missing or invalid");
  }

  if (
    !(
      "date" in object &&
      "description" in object &&
      "specialist" in object &&
      "type" in object
    )
  ) {
    throw new Error(
      "data (date, description, specialist or type) is missing or invalid"
    );
  }

  const baseEntry = {
    id: uuid(),
    date: parseString(object.date),
    description: parseString(object.description),
    specialist: parseString(object.specialist),
  };

  const type = parseEntryType(object.type);

  const diagnosisCodes =
    "diagnosisCodes" in object ? parseDiagnosisCodes(object) : [];

  if (type === "HealthCheck" && "healthCheckRating" in object) {
    console.log("health check type");
    return {
      ...baseEntry,
      type,
      diagnosisCodes,
      healthCheckRating: parseEntryHealthCheckRating(object.healthCheckRating),
    };
  }

  if (type === "OccupationalHealthcare" && "employerName" in object) {
    return {
      ...baseEntry,
      type,
      diagnosisCodes,
      employerName: parseString(object.employerName),
    };
  }

  if (type === "Hospital" && "discharge" in object) {
    return {
      ...baseEntry,
      type,
      diagnosisCodes,
      discharge: parseEntryDischarge(object.discharge),
    };
  }

  throw new Error("some fields are missing from data");
};
