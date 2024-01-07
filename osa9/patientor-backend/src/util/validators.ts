import {
  Diagnosis,
  Entry,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthCareEntry,
} from "../types";

export const isNumber = (param: unknown): param is number => {
  return typeof param === "number" || param instanceof Number;
};

export const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String;
};

export const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

export const isEntryType = (param: unknown): param is Entry["type"] => {
  const entry = param as Entry["type"];

  switch (entry) {
    case "Hospital":
      return true;
    case "OccupationalHealthcare":
      return true;
    case "HealthCheck":
      return true;
    default:
      return false;
  }
};

export const isEntryHealthCheckRating = (
  param: unknown
): param is HealthCheckEntry["healthCheckRating"] => {
  const rating = param as HealthCheckEntry["healthCheckRating"];

  switch (rating) {
    case HealthCheckRating.Healthy:
      return true;
    case HealthCheckRating.LowRisk:
      return true;
    case HealthCheckRating.HighRisk:
      return true;
    case HealthCheckRating.CriticalRisk:
      return true;
    default:
      return false;
  }
};

export const parseString = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error(`${param} is not a string`);
  }
  return param;
};

export const parseGender = (param: unknown): Gender => {
  if (!param || !isString(param) || !isGender(param)) {
    throw new Error(`${param} is not a valid gender`);
  }
  return param;
};

export const parseEntryType = (param: unknown): Entry["type"] => {
  if (!param || !isString(param) || !isEntryType(param)) {
    throw new Error(`${param} is not a valid entry type`);
  }
  return param;
};

export const parseEntryHealthCheckRating = (
  param: unknown
): HealthCheckEntry["healthCheckRating"] => {
  if (
    param === undefined ||
    !isNumber(param) ||
    !isEntryHealthCheckRating(param)
  ) {
    throw new Error(`${param} is not a valid health check rating`);
  }
  return param;
};

export const parseEntryDischarge = (
  object: unknown
): HospitalEntry["discharge"] => {
  if (!object || typeof object !== "object") {
    throw new Error("data is missing or invalid");
  }

  if (!("date" in object && "criteria" in object)) {
    throw new Error("data is missing or invalid");
  }

  if (!isString(object.date) || !isString(object.criteria)) {
    throw new Error("data is missing or invalid");
  }

  return object as HospitalEntry["discharge"];
};

export const parseSickLeave = (
  object: unknown
): OccupationalHealthCareEntry["sickLeave"] => {
  if (!object || typeof object !== "object") {
    throw new Error("data is missing or invalid");
  }

  if (!("startDate" in object && "endDate" in object)) {
    throw new Error("data is missing or invalid");
  }

  if (!isString(object.startDate) || !isString(object.endDate)) {
    throw new Error("data is missing or invalid");
  }

  return object as OccupationalHealthCareEntry["sickLeave"];
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};
