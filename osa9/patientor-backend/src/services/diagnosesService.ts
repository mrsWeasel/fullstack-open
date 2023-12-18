import data from "../../data/diagnoses";

interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const getDiagnoses = (): Diagnosis[] => {
  return data;
};
