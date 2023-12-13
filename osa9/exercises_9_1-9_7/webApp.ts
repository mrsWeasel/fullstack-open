import express from 'express';
import { getParsedNumber } from './utils/validateUtils';
import { calculateBmi } from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

const PORT = 3003;

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

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

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises: hours, target } = req.body || {};

    if (hours === undefined || target === undefined) {
      res.status(400).send({
        error: 'parameters missing',
      });
      return;
    }

    const targetValid = typeof target === 'number';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hoursValid = Array.isArray(hours) && hours.every((h: any) => typeof h === 'number');

    if (!targetValid || !hoursValid) {
      res.status(400).send({
        error: 'malformatted parameters',
      });
      return;
    }

    const exercises = calculateExercises(target, hours as number[]);
    res.json(exercises);
  } catch (error) {
    res.send({
      error: 'unknown error happened',
    });
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
