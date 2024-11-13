const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let points = [];
let visits = [];

app.get('/points', (req, res) => {
  res.json(points);

  app.post('/points', (req, res) => {
  const newPoint = { _id: Date.now().toString(), name: req.body.name };
  points.push(newPoint);
  res.status(201).json(newPoint);     
