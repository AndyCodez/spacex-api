import React, { ChangeEvent, useState } from 'react';
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

  const filterLaunches = (filterName: string, filterStatus?: boolean) => {
    const launches: Launch[] = launchesJson ? JSON.parse(launchesJson) : [];

    const filteredByName = launches.filter((launch) => (
      filterName.trim().length > 0
        ? launch.name.toLowerCase().includes(filterName.toLowerCase()) : launches
    ));

    const filteredByNameAndStatus = filteredByName.filter((launch) => (
      filterStatus === launch.success
    ));

    dispatch(setLaunches(filteredByNameAndStatus));
  };

  const [filterName, setFilterName] = useState('');

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    filterLaunches(event.target.value);
  };

  const options: string[] = ['success', 'failed'];
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    filterLaunches(filterName, event.target.value === options[0]);
  };

  return (
    <div>
      <input onChange={handleFilterByName} placeholder="filter by name" />

      <select value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}
