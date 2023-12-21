interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface Props {
  courseParts: CoursePart[];
}

const Content: React.FC<Props> = ({ courseParts }) => {
  return (
    <div>
      {courseParts?.map((cp) => (
        <p>
          {cp.name} {cp.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
