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
});

        app.put('/points/:id', (req, res) => {
  const pointIndex = points.findIndex(point => point._id === req.params.id);
  if (pointIndex !== -1) {
    points[pointIndex].name = req.body.name; 
    res.status(200).json(points[pointIndex]);
  } else {
    res.status(404).json({ message: 'Point not found' });
  }
});

     
app.delete('/points/:id', (req, res) => {
  points = points.filter(point => point._id !== req.params.id);
  visits = visits.filter(visit => visit.pointId !== req.params.id); // הסרת הביקורים המשויכים
  res.status(204).end();
});   
