import { getParsedNumber } from './utils/validateUtils';

const calculateBmi = (massKg: string | number, heightCm: string | number): string => {
  try {
    const height = getParsedNumber(heightCm) / 100;
    const mass = getParsedNumber(massKg);

    const bmi = mass / (height * height);
    console.log(bmi);

    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal (healthy weight)';
    return 'Overweight';
  } catch (error) {
    console.log(error.message);
  }
};

console.log(calculateBmi(55, 164));
