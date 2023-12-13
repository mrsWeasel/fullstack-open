import { getParsedNumber } from './utils/validateUtils';

export const calculateBmi = (
  heightCm: number | string,
  massKg: number | string,
): string | undefined => {
  try {
    const height = getParsedNumber(heightCm) / 100;
    const mass = getParsedNumber(massKg);

    if (height === 0 || mass === 0) throw new Error('Height or weight cannot be 0');

    const bmi = mass / (height * height);

    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal (healthy weight)';

    return 'Overweight';
  } catch (error) {
    let message = 'Error calculating BMI';
    if (error instanceof Error) message = error.message;

    console.log(message);
    return undefined;
  }
};

const heightCm = process.argv[2];
const massKg = process.argv[3];
console.log(calculateBmi(heightCm, massKg));
