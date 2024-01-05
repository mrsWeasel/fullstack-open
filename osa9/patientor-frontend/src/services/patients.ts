import axios from "axios";
import { EntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const postEntry = async (object: EntryFormValues, patient: Patient) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${patient.id}/entries`,
    object
  );

  return data;
};

export default {
  getAll,
  create,
  postEntry,
};
