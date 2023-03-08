import React from 'react';

interface Launch {
  id: number;
  flight_number: number;
  name: string;
  date_utc: string;
  static_fire_date_utc: string;
  rocket: string | null;
  success: boolean | null;
  upcoming: boolean;
}

interface CardProps {
  launch: Launch
}

function Card({ launch }: CardProps): JSX.Element {
  return (
    <div style={{ border: '1px solid black' }}>
      <p>{launch.name}</p>
    </div>
  );
}

export default Card;
