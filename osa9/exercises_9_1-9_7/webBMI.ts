import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { getParsedNumber } from './utils/validateUtils';

const app = express();
const port = 3003;

app.get('/bmi', (req, res) => {
  try {
    const height = getParsedNumber(req.query.height);
    const weight = getParsedNumber(req.query.weight);
    const bmi = calculateBmi(height, weight);

    res.send({
      height,
      weight,
      bmi,
    });
  } catch (error) {
    res.send({
      error: 'malformatted parameters',
    });
  }
});

app.listen(port, () => {
  console.log(`Web BMI calculator app running on port ${port}`);
});
