// Home.js
import React from 'react';
import Card from './components/Card';
 // Importa o arquivo CSS

const Home = () => {
  return (
    <div >
      <h1>Bem-vindo ao Resguardar</h1>
      <div >
        <Card title="Controle" link="/control" />
        <Card title="Monitoramento" link="/monitor" />
        <Card title="Histórico" link="https://thingspeak.com/channels/2463110" />
      </div>
    </div>
  );
};

export default Home;
