import { getParsedNumber } from './utils/validateUtils';

const calculateBmi = (heightCm: number | string, massKg: number | string): string => {
  try {
    const height = getParsedNumber(heightCm) / 100;
    const mass = getParsedNumber(massKg);

    if (height === 0 || mass === 0) throw new Error('Height or weight cannot be 0');

    const bmi = mass / (height * height);

    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal (healthy weight)';
    return 'Overweight';
  } catch (error) {
    console.log(error.message);
  }
};

const heightCm = process.argv[2];
const massKg = process.argv[3];
console.log(calculateBmi(heightCm, massKg));
