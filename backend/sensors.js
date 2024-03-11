const onoff = require('onoff');
const Gpio = onoff.Gpio;
const ledPin = new Gpio(4, 'out');
const ledPin2 = new Gpio(15, 'out');
const buzzer = new Gpio(3, 'out');
const axios = require('axios');
const { sendDataToClients } = require('./socket');

ledPin.writeSync(0);
ledPin2.writeSync(0);
buzzer.writeSync(0);

var notifications = [];

const sendNotification = (type, message) => {
  if (type === 1) {
    ledUsage(0);
    notifications.push({ message, type });
  } else if (type === 2) {
    ledUsage(1);
    notifications.push({ message, type });
  }
};

const endNotification = () => {
  ledPin.writeSync(0);
  ledPin2.writeSync(0);
  buzzer.writeSync(0);
};

async function sendData(dict) {
  const { temperature, humidity, co2, presenceDetected, lightIntensity } = dict;

  await axios.post('https://api.thingspeak.com/update.json', {
    api_key: 'VR3KMDA2SSZ8L9L0',
    field1: temperature,
    field2: humidity,
    field3: co2,
    field4: lightIntensity
  });
}

const readSensors = () => {
  const { temperature, humidity } = readDHT();
  co2 = readMQ9();
  presenceDetected = readPIR();
  lightIntensity = readLDR();

  const dict = { temperature, humidity, co2, presenceDetected, lightIntensity };
  sendData(dict);
  sendDataToClients({ data: dict, notifications });
  notifications = [];
  return { temperature, humidity, co2, presenceDetected, lightIntensity };
};

const ledUsage = (level) => {
  switch (level) {
    case 0:
      ledPin.writeSync(1);
      setTimeout(() => {
        ledPin.writeSync(0);
      }, 1000);
      break;

    case 1:
      if (buzzer.readSync() === 0) {
        buzzer.write(1);
        ledPin2.writeSync(1);
      }
      break;

    default:
      throw new Error('Nível de notificação inválido');
  }
};

const readMQ9 = () => {
  const co2 = (Math.random() * 1000).toFixed(2);

  if (co2 > 600) sendNotification(2, 'Nível elevado de CO2. Tomar precauções imediatas');
  else if (co2 > 400) sendNotification(1, 'Nível anormal de CO2. Monitorar situações');

  console.log(`Leitura do sensor MQ-9: ${co2}`);
  return co2;
};

const readDHT = () => {
  const temperature = (Math.random() * 50).toFixed(2);
  const humidity = (Math.random() * 100).toFixed(2);

  if (temperature > 40) {
    sendNotification(1, 'Temperatura elevada. Monitorar condições.');
  }

  console.log(`Leitura do sensor DHT: Temperatura: ${temperature}°C, Umidade: ${humidity}%`);
  return { temperature, humidity };
};

const readPIR = () => {
  const presenceDetected = Math.random() > 0.5;

  if (presenceDetected) {
    sendNotification(1, 'Movimento detectado. Monitorar situação.');
  } else {
    console.log('Nenhum movimento');
  }

  return presenceDetected;
};

const readLDR = () => {
  const lightIntensity = (Math.random() * 100).toFixed(2);

  console.log(`Leitura do sensor LDR: Intensidade de luz: ${lightIntensity}`);
  return lightIntensity;
};

process.on('SIGINT', () => {
  ledPin.writeSync(0);
  ledPin.unexport();
  ledPin2.writeSync(0);
  ledPin2.unexport();
  buzzer.writeSync(0);
  buzzer.unexport();
  process.exit();
});

module.exports = { endNotification, sendData, readSensors, readDHT, readMQ9, readPIR, readLDR, ledUsage };