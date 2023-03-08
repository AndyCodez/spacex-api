import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setLaunches } from '../store/slices/launchesSlice';

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

export default function Launches() {
  const launches = useSelector((state: RootState) => state.launches);
  const dispatch = useDispatch();

  const fetchLaunches = async () => {
    const response = await fetch('https://api.spacexdata.com/latest/launches');
    // const response = await fetch('https://api.spacexdata.com/v5/launches');

    const jsonData = await response.json();
    const selectedData = jsonData.map((data: any) => ({
      id: data.id,
      flight_number: data.flight_number,
      name: data.name,
      date_utc: data.date_utc,
      static_fire_date_utc: data.static_fire_date_utc,
      rocket: data.uuid,
      success: data.success,
      upcoming: data.upcoming,
    }));

    dispatch(setLaunches(selectedData));
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  return (
    <div>
      {launches
        .map((launch: Launch) => (
          <div key={launch.id}>
            <p>{launch.name}</p>
          </div>
        ))}
    </div>
  );
}
