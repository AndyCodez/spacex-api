import React, { } from 'react';
import { useDispatch } from 'react-redux';
import { } from '../store';
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

export default function Filter() {
  const launchesJson = localStorage.getItem('allLaunches');

  const dispatch = useDispatch();

  const filterByName = (filterName: string) => {
    const launches: Launch[] = launchesJson ? JSON.parse(launchesJson) : [];

    const filteredLaunches = launches.filter((launch) => (
      filterName.trim().length > 0 ? launch.name.includes(filterName) : launches));

    dispatch(setLaunches(filteredLaunches));
  };

  return (
    <div>

      <input onChange={(e) => filterByName(e.target.value)} placeholder="filter by name" />

    </div>
  );
}
