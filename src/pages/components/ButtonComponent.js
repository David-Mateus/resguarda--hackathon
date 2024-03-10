// components/ButtonComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Button.module.css';

const ButtonComponent = () => {
  const [isNotificationOff, setIsNotificationOff] = useState(false);

  useEffect(() => {
    // Atualiza a página quando isNotificationOff é true
    if (isNotificationOff) {
      setTimeout(() => {
        location.reload();
      }, 1000); // Aguarda 1 segundo antes de recarregar a página (ajuste conforme necessário)
    }
  }, [isNotificationOff]);

  const handleClick = async () => {
    try {
      // Chamada à API para desligar a notificação
      await axios.get('http://192.168.43.5:3000/end_notification');
      console.log('Notificação desligada com sucesso!');
      
      // Atualiza o estado para refletir que a notificação foi desligada
      setIsNotificationOff(true);
    } catch (error) {
      console.error('Erro ao desligar notificação:', error);
    }
  };

  return (
    <div className={styles.buttoncontainer}>
      <div>
        <button onClick={handleClick} className={styles.button} disabled={isNotificationOff}>
          {isNotificationOff ? 'Notificação Desligada' : 'Desligar a notificação'}
        </button>
        <a href="https://thingspeak.com/channels/2463110" className={styles.link}>Histórico</a>
      </div>
    </div>
  );
};

export default ButtonComponent;
