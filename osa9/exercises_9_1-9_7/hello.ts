import express from 'express';

const app = express();
const port = 3003;

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.listen(port, () => {
  console.log(`Hello app running on port ${port}`);
});
