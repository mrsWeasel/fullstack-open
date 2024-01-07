import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
  TextField,
  InputLabel,
  Select,
  Button,
  ButtonGroup,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import {
  Diagnosis,
  Entry,
  EntryFormValues,
  HealthCheckRating,
  Patient,
} from "../../types";
import { SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";
import axios from "axios";
import { assertNever } from "../../utils";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  updatePatients: (patient: Patient) => void;
  patient: Patient;
  diagnoses: Diagnosis[];
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  updatePatients,
  patient,
  diagnoses,
}: Props) => {
  const [error, setError] = useState("");
  const [type, setType] = useState<Entry["type"]>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState(new Date());
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState(new Date());
  const [employerName, setEmployerName] = useState("");
  const [dischargeDate, setDischargeDate] = useState(new Date());
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const resetForm = () => {
    setType("HealthCheck");
    setDescription("");
    setDate(new Date());
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating(HealthCheckRating.Healthy);
    setSickLeaveStartDate(new Date());
    setSickLeaveEndDate(new Date());
    setEmployerName("");
    setDischargeDate(new Date());
    setDischargeCriteria("");
  };

  const handleSelectDiagnoses = (event: SelectChangeEvent<string[]>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const createEntry = (): EntryFormValues => {
    const baseEntry = {
      description,
      date: formatDate(date),
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
            date: formatDate(dischargeDate),
            criteria: dischargeCriteria,
          },
        };
      case "OccupationalHealthcare":
        return {
          ...baseEntry,
          type,
          employerName,
          sickLeave: {
            startDate: formatDate(sickLeaveStartDate),
            endDate: formatDate(sickLeaveEndDate),
          },
        };
      default:
        return assertNever(type);
    }
  };

  const addEntry = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    try {
      const newEntry = createEntry();
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
          <InputLabel id="select-type">Type of reception</InputLabel>
          <Select
            sx={{ mb: 2 }}
            label="Type"
            labelId="select-type"
            fullWidth
            value={type}
            native={true}
            onChange={({ target }) => setType(target.value as Entry["type"])}
          >
            <option value="HealthCheck">Health check</option>
            <option value="Hospital">Hospital</option>
            <option value="OccupationalHealthcare">
              Occupational healthcare
            </option>
          </Select>

          <TextField
            sx={{ mb: 2 }}
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              sx={{ mb: 2 }}
              label="Date"
              value={date}
              onChange={(newDate) => newDate && setDate(newDate)}
            />
          </LocalizationProvider>

          <TextField
            sx={{ mb: 2 }}
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          {type === "HealthCheck" && (
            <>
              <InputLabel>Health check rating</InputLabel>
              <ButtonGroup fullWidth sx={{ mb: 2 }}>
                <Button
                  variant={healthCheckRating === 0 ? "contained" : "outlined"}
                  onClick={() => setHealthCheckRating(0)}
                >
                  Healthy
                </Button>
                <Button
                  variant={healthCheckRating === 1 ? "contained" : "outlined"}
                  onClick={() => setHealthCheckRating(1)}
                >
                  Low risk
                </Button>
                <Button
                  variant={healthCheckRating === 2 ? "contained" : "outlined"}
                  onClick={() => setHealthCheckRating(2)}
                >
                  High risk
                </Button>
                <Button
                  variant={healthCheckRating === 3 ? "contained" : "outlined"}
                  onClick={() => setHealthCheckRating(3)}
                >
                  Critical risk
                </Button>
              </ButtonGroup>
            </>
          )}
          {type === "Hospital" && (
            <>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  sx={{ mb: 2 }}
                  label="Discharge date"
                  value={dischargeDate}
                  onChange={(newDate) => newDate && setDischargeDate(newDate)}
                />
              </LocalizationProvider>

              <TextField
                sx={{ mb: 2 }}
                label="Discharge criteria"
                fullWidth
                multiline
                minRows={3}
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </>
          )}
          {type === "OccupationalHealthcare" && (
            <>
              <TextField
                sx={{ mb: 2 }}
                label="Employer name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  sx={{ mb: 2, mr: 2 }}
                  label="Sick leave start date"
                  value={sickLeaveStartDate}
                  onChange={(newDate) => {
                    if (!newDate) return;
                    setSickLeaveStartDate(newDate);
                    sickLeaveEndDate &&
                      sickLeaveEndDate < newDate &&
                      setSickLeaveEndDate(newDate);
                  }}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  sx={{ mb: 2 }}
                  label="Sick leave end date"
                  value={sickLeaveEndDate}
                  minDate={sickLeaveStartDate}
                  onChange={(newDate) =>
                    newDate && setSickLeaveEndDate(newDate)
                  }
                />
              </LocalizationProvider>
            </>
          )}
          <InputLabel id="select-diagnosis-codes">Diagnosis codes</InputLabel>
          <Select
            sx={{ mb: 2 }}
            labelId="select-diagnosis-codes"
            multiple
            value={diagnosisCodes}
            renderValue={(selected) => (selected as string[]).join(", ")}
            fullWidth
            onChange={(event: SelectChangeEvent<string[]>) =>
              handleSelectDiagnoses(event)
            }
          >
            {diagnoses.map((d) => (
              <MenuItem
                key={d.code}
                value={d.code}
                style={
                  diagnosisCodes.indexOf(d.code) !== -1
                    ? { fontWeight: "bold" }
                    : {}
                }
              >
                {d.code}: {d.name}
              </MenuItem>
            ))}
          </Select>
          <Button
            sx={{ mb: 2 }}
            variant="outlined"
            onClick={() => {
              resetForm();
              onClose();
            }}
            fullWidth
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
