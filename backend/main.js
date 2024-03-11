const express = require('express');
const axios = require('axios');
const { interval } = require('rxjs');
const { switchMap } = require('rxjs/operators');

const app = express();
const PORT = 3000;

const {
  endNotification,
  sendData,
  readSensors,
  readDHT,
  readMQ9,
  readPIR,
  readLDR,
  ledUsage,
  turnLedOff
} = require('./sensors');

const sensorInterval$ = interval(10000);
const subscription = sensorInterval$.pipe(
  switchMap(() => {
    dict = readSensors();
    return interval(0);
  })
).subscribe();

app.get('/end_notification', (req, res) => {
  endNotification();

  console.log("desligou a notificacao");
  res.json(`desligou`);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
