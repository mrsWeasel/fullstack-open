interface Props {
  totalExercises: number;
}

const Total: React.FC<Props> = ({ totalExercises }) => {
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
