import { useEffect, useState } from "react";
import ButtonComponent from "./components/ButtonComponent";
import styles from "../styles/monitor.module.css";

const WebSocketClientPage = () => {
  const [sensorData, setSensorData] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.43.5:3001");

    socket.addEventListener("open", () => {
      console.log("Conexão estabelecida com o servidor.");
    });

    socket.addEventListener("message", (event) => {
      const { data, notifications } = JSON.parse(event.data);
      console.log("Mensagem do servidor:", { data, notifications });

      setSensorData(data);
      setNotifications(notifications);
    });

    socket.addEventListener("close", () => {
      console.log("Conexão encerrada.");
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className={styles.sensorcontainer}>
      <h1 className={styles.centeredtitle}>Resguarda</h1>

      <div>
        <p>Temperatura: {sensorData.temperature}</p>
        <p>Umidade: {sensorData.humidity}</p>
        <p>CO2: {sensorData.co2}</p>
        <p>Presença Detectada: {String(sensorData.presenceDetected)}</p>
        <p>Intensidade de Luz: {sensorData.lightIntensity}</p>
      </div>

      <div className={styles.notificationContainer}>
        <h3 className={styles.h3}>Notificações</h3>
        <ul className={styles.notificationList}>
          {notifications.map((notification, index) => (
            <li key={index} className={styles.notificationItem}>
              {notification.message}
            </li>
          ))}
        </ul>
      </div>

      <ButtonComponent />
    </div>
  );
};

export default WebSocketClientPage;
