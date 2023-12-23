import { CoursePart } from "../App";
import Part from "./Part";

interface Props {
  courseParts: CoursePart[];
}

const Content: React.FC<Props> = ({ courseParts }) => {
  return (
    <div>
      {courseParts?.map((cp) => (
        <Part coursePart={cp} />
      ))}
    </div>
  );
};

export default Content;
