import express from "express";
const app = express();

app.use(express.json());

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
});

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("pinging");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
