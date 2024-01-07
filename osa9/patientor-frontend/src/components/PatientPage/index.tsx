import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Diagnosis, Gender, Patient } from "../../types";
import { Box, Button } from "@mui/material";
import { assertNever } from "../../utils";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { useState } from "react";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientPage = ({ patients, diagnoses, setPatients }: Props) => {
  const { id } = useParams();
  const [addEntryModalOpen, setAddEntryModalOpen] = useState<boolean>(false);

  const patient = patients.find((p) => p.id === id);
  if (!patient) return null;

  const getGenderIcon = (gender: Gender): React.ReactNode => {
    switch (gender) {
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Other:
        return <TransgenderIcon />;
      default:
        return assertNever(gender);
    }
  };

  return (
    <div>
      <AddEntryModal
        patient={patient}
        diagnoses={diagnoses}
        modalOpen={addEntryModalOpen}
        onClose={() => setAddEntryModalOpen(false)}
        updatePatients={(newPatient) => {
          setPatients(
            patients.map((p) => (p.id === newPatient.id ? newPatient : p))
          );
          setAddEntryModalOpen(false);
        }}
      />
      <h2>
        {patient.name} {getGenderIcon(patient.gender)}
      </h2>
      {patient.ssn && <p>SSN: {patient.ssn}</p>}
      {patient.dateOfBirth && <p>Date of birth: {patient.dateOfBirth}</p>}
      <p>Occupation: {patient.occupation}</p>

      <h3>Entries</h3>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddEntryModalOpen(true)}
      >
        Add entry
      </Button>
      {patient.entries.map((e) => (
        <Box
          key={e.id}
          sx={{
            border: 1,
            borderColor: "grey.300",
            borderRadius: 1,
            my: 1,
            px: 1,
          }}
        >
          <EntryDetails entry={e} diagnoses={diagnoses} />
        </Box>
      ))}
    </div>
  );
};

export default PatientPage;
