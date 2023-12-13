import { getParsedNumber } from './utils/validateUtils';

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

const calculateExercises = (target: number, hours: number[]): exerciseHours | undefined => {
  try {
    if (!target) throw new Error('No target exercise hours given as input');

    if (hours.length < 1) throw new Error('No hours given as input');

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
  } catch (error) {
    let message = 'Error calculating exercises';
    if (error instanceof Error) message = error.message;

    console.log(message);
    return undefined;
  }
};

const calculateWithArguments = () => {
  try {
    const target: number = getParsedNumber(process.argv[2]);

    const hours: number[] =
      process.argv.splice(3).map((h) => {
        const hourInput = getParsedNumber(h);
        return hourInput;
      }) ?? [];

    console.log(calculateExercises(target, hours));
  } catch (error) {
    let message = 'Error calculating exercises';
    if (error instanceof Error) message = error.message;

    console.log(message);
    return undefined;
  }
};

calculateWithArguments();

export default calculateExercises;
