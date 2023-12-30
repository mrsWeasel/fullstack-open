import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BadgeIcon from "@mui/icons-material/Badge";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Diagnosis, Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthIcon from "./HealthIcon";
import EntryDiagnosisCodes from "./EntryDiagnosisCodes";

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
  entry,
  diagnoses,
}) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <LocalHospitalIcon />
          <p>Date: {entry.date}</p>
          <p>Specialist: {entry.specialist}</p>
          <p>{entry.description}</p>
          <p>
            Discharge: {entry.discharge.date} {entry.discharge.criteria}
          </p>
          <EntryDiagnosisCodes entry={entry} diagnoses={diagnoses} />
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <MonitorHeartIcon />
          <p>Date: {entry.date}</p>
          <p>Specialist: {entry.specialist}</p>
          <p>{entry.description}</p>
          <div>
            <HealthIcon rating={entry.healthCheckRating} />
            {`Health check rating: ${entry.healthCheckRating} (0-3)`}
          </div>
          <EntryDiagnosisCodes entry={entry} diagnoses={diagnoses} />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <BadgeIcon />
          <p>Date: {entry.date}</p>
          <p>Specialist: {entry.specialist}</p>
          <p>{entry.description}</p>
          <p>Employer: {entry.employerName}</p>
          {entry.sickLeave && (
            <p>
              Sick leave: {entry.sickLeave?.startDate} -{" "}
              {entry.sickLeave?.endDate}
            </p>
          )}
          <EntryDiagnosisCodes entry={entry} diagnoses={diagnoses} />
        </div>
      );
    default:
      assertNever(entry);
  }
};

export default EntryDetails;
