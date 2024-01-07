import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
  TextField,
  //   InputLabel,
  //   MenuItem,
  //   Select,
  //   Grid,
  Button,
  //   SelectChangeEvent,
} from "@mui/material";
import {
  Diagnosis,
  Entry,
  EntryFormValues,

  //   EntryFormValues,
  HealthCheckRating,
  Patient,
  //   PatientFormValues,
} from "../../types";
import { SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";
import axios from "axios";
import { assertNever } from "../../utils";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  updatePatients: (patient: Patient) => void;
  patient: Patient;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  updatePatients,
  patient,
}: Props) => {
  const [error, setError] = useState("");
  const [type, setType] = useState<Entry["type"]>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const resetForm = () => {
    setType("HealthCheck");
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating(HealthCheckRating.Healthy);
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
    setEmployerName("");
    setDischargeDate("");
    setDischargeCriteria("");
  };

  const createEntry = (): EntryFormValues => {
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case "HealthCheck":
        return {
          ...baseEntry,
          type,
          healthCheckRating,
        };
      case "Hospital":
        return {
          ...baseEntry,
          type,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
      case "OccupationalHealthcare":
        return {
          ...baseEntry,
          type,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };
      default:
        return assertNever(type);
    }
  };

  const addEntry = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    const newEntry = createEntry();

    try {
      const updatedPatient = await patientService.postEntry(newEntry, patient);
      updatePatients(updatedPatient);
      resetForm();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.error || "Error adding entry");
      } else {
        setError("Error adding entry");
      }
    }
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={(event) => addEntry(event)}>
          <TextField
            label="Type"
            fullWidth
            value={type}
            onChange={({ target }) => setType(target.value as Entry["type"])}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          {type === "HealthCheck" && (
            <TextField
              label="Health check rating"
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value))
              }
            />
          )}
          {type === "Hospital" && (
            <>
              <TextField
                label="Discharge date"
                fullWidth
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
              <TextField
                label="Discharge criteria"
                fullWidth
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </>
          )}
          {type === "OccupationalHealthcare" && (
            <>
              <TextField
                label="Employer name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
              <TextField
                label="Sick leave start date"
                fullWidth
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
              />
              <TextField
                label="Sick leave end date"
                fullWidth
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
              />
            </>
          )}
          <TextField
            label="Diagnosis codes"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) =>
              setDiagnosisCodes(target.value.split(", "))
            }
          />
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
