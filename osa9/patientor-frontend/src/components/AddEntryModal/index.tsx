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
  EntryFormValues,

  //   EntryFormValues,
  HealthCheckRating,
  Patient,
  //   PatientFormValues,
} from "../../types";
import { SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (patient: Patient) => void;
  patient: Patient;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, patient }: Props) => {
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]> | undefined
  >(undefined);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const addEntry = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    const newEntry: EntryFormValues = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
    };
    try {
      const updatedPatient = await patientService.postEntry(newEntry, patient);
      onSubmit(updatedPatient);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        setError(e.message);
      } else {
        console.error(e);
        setError("Unknown error when trying to add entry");
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
          <TextField
            label="Health check rating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value))
            }
          />
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
