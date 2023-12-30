import { Diagnosis, Entry } from "../../types";

const EntryDiagnosisCodes: React.FC<{
  entry: Entry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  return (
    <div>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes.map((code) => {
            const diagnosis = diagnoses.find((d) => d.code === code);
            if (!diagnosis) return null;
            return (
              <li key={code}>
                {code} {diagnosis.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default EntryDiagnosisCodes;
