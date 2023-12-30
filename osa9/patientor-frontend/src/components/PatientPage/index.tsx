import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Diagnosis, Gender, Patient } from "../../types";
import { Box } from "@mui/material";
import { assertNever } from "../../utils";
import EntryDetails from "./EntryDetails";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
}

const PatientPage = ({ patients, diagnoses }: Props) => {
  const { id } = useParams();

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
      <h2>
        {patient.name} {getGenderIcon(patient.gender)}
      </h2>
      {patient.ssn && <p>SSN: {patient.ssn}</p>}
      {patient.dateOfBirth && <p>Date of birth: {patient.dateOfBirth}</p>}
      <p>Occupation: {patient.occupation}</p>

      {patient.entries && patient.entries.length > 0 && <h3>Entries</h3>}
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
