// components/Card.js
import React from 'react';
import Link from 'next/link';


const Card = ({ title, link }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles['card-title']}>{title}</h3>
      <Link href={link}>
        Ver mais
      </Link>
    </div>
  );
};

export default Card;
