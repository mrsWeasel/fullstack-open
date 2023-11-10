type Rating = 1 | 2 | 3;
type RatingDescription = 'bad' | 'not too bad but could be better' | 'good';

interface exerciseHours {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
}

const calculateExercises = (hours: number[], target: number): exerciseHours => {
  if (!hours || hours.length < 1 || !target) throw new Error('invalid input');

  const trainingDays = hours.filter((hrs) => hrs > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / hours.length;

  let rating: Rating | undefined;
  let ratingDescription: RatingDescription | undefined;

  if (average < 0.5 * target) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (average >= 1 * target) {
    rating = 3;
    ratingDescription = 'good';
  } else {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength: hours.length,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
