// pages/api/history.js
export default async function handler(req, res) {
 
  const historyData = [
    { timestamp: '2022-01-01', temperature: 25, co2: 400, humidity: 50 },
    { timestamp: '2022-01-02', temperature: 26, co2: 450, humidity: 48 },
    // Adicionar mais entradas conforme necessário
  ];

  res.status(200).json(historyData);
}
