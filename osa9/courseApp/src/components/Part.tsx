import { CoursePart } from "../App";
import styled from "styled-components";

interface Props {
  coursePart: CoursePart;
}

const CoursePartContainer = styled.div`
  padding: 1rem;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  margin-bottom: 1rem;

  h2 {
    font-size: 1rem;
  }
`;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<Props> = ({ coursePart }) => {
  const heading = (
    <h2>
      {coursePart.name} ({coursePart.exerciseCount} exercises)
    </h2>
  );

  switch (coursePart.kind) {
    case "basic":
      return (
        <CoursePartContainer>
          {heading}
          <p>{coursePart.description}</p>
        </CoursePartContainer>
      );
    case "group":
      return (
        <CoursePartContainer>
          {heading}
          <p>Project exercises: {coursePart.groupProjectCount}</p>
        </CoursePartContainer>
      );
    case "background":
      return (
        <CoursePartContainer>
          {heading}
          <p>{coursePart.description}</p>
          <p>
            Background material:{" "}
            <a href={coursePart.backgroundMaterial}>
              {coursePart.backgroundMaterial}
            </a>
          </p>
        </CoursePartContainer>
      );
    case "special":
      return (
        <CoursePartContainer>
          {heading}
          <p>{coursePart.description}</p>
          <p>Requirements: {coursePart.requirements.join(", ")}</p>
        </CoursePartContainer>
      );
    default:
      assertNever(coursePart);
  }

  return null;
};

export default Part;
