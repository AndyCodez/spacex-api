import React from 'react';

interface Launch {
  id: number;
  flight_number: number;
  name: string;
  date_utc: string;
  static_fire_date_utc: string;
  rocket: string | null;
  success: string;
  upcoming: boolean;
}

interface CardProps {
  launch: Launch
}

function Card({ launch }: CardProps): JSX.Element {
  return (

    <div className="bg-white rounded-lg overflow-hidden shadow-lg mx-auto max-w-sm">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{launch.name}</h2>
        <p className="text-gray-700 text-base">{launch.date_utc}</p>
        <p className={`text-base ${launch.success === 'Successful' ? 'text-green-500' : 'text-red-500'}`}>
          Status:
          {' '}
          {launch.success}
        </p>
        <p className="text-base">{launch.upcoming ? 'Upcoming' : false }</p>
      </div>
    </div>

  );
}

export default Card;
