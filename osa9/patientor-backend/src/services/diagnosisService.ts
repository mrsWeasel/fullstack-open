import data from "../../data/diagnoses";
import { Diagnosis } from "../types/Diagnosis";

export const getDiagnoses = (): Diagnosis[] => {
  return data;
};
