const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('email-validator');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  console.info('/hello call success');
  res.send('Welcome to Firebase Cloud Functions');
});

app.post('/emailValidate', (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({
      status: false,
      message: 'Wrong input'
    });
  }

  const valid = validator.validate(email);

  return res.json({
    status: valid
  });
});

exports.app = onRequest(app);