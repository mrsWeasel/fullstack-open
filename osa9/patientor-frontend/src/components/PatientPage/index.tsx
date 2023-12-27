import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Gender, Patient } from "../../types";

interface Props {
  patients: Patient[];
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientPage = ({ patients }: Props) => {
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
    </div>
  );
};

export default PatientPage;
