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
  const launches: Launch[] = launchesJson ? JSON.parse(launchesJson) : [];

  const options: string[] = ['failed', 'success'];
  const [selectedStatus, setSelectedStatus] = useState('');

  const filterLaunches = (
    filterName: string,
    filterStatus?: boolean,
    filterDate?: string,
    filterUpcoming?: boolean,
  ) => {
    const filteredByName = filterName.trim().length > 0 ? launches.filter((launch) => (
      launch.name.toLowerCase().includes(filterName.toLowerCase())
    )) : launches;

    const filteredByNameAndStatus = (filterStatus === undefined)
      ? (filteredByName) : (filteredByName.filter((launch) => (
        filterStatus === launch.success
      )));

    const filteredByNameStatusAndDate = filteredByNameAndStatus.filter((launch) => {
      const launchDate = new Date(Date.parse(launch.date_utc));
      const currentDate = new Date();

      switch (filterDate) {
        case 'lastWeek':
          return launchDate > new Date(
            currentDate.getTime() - 7 * 247 * 24 * 60 * 60 * 1000,
          );
        case 'lastMonth':
          return launchDate
          > new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate(),
          );
        case 'lastYear':
          return launchDate
            > new Date(
              currentDate.getFullYear() - 1,
              currentDate.getMonth(),
              currentDate.getDate(),
            );
        default:
          return true;
      }
    });

    const filterByUpcoming = filteredByNameStatusAndDate.filter(
      (launch) => filterUpcoming === launch.upcoming,
    );

    if (filterUpcoming) {
      dispatch(setLaunches(filterByUpcoming));
    } else if (filterDate) {
      dispatch(setLaunches(filteredByNameStatusAndDate));
    } else if (filterStatus) {
      dispatch(setLaunches(filteredByNameAndStatus));
    } else {
      dispatch(setLaunches(filteredByName));
    }
  };

  const [filterName, setFilterName] = useState('');

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    filterLaunches(event.target.value);
  };

  const handleFilterByStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    filterLaunches(filterName, event.target.value === options[1]);
  };

  const [filterDate, setFilterDate] = useState('');

  const handleFilterByDate = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterDate(event.target.value);
    filterLaunches(filterName, selectedStatus === options[1], event.target.value);
  };

  const clearFilters = () => {
    setFilterName('');
    setFilterDate('');
    setSelectedStatus('');

    dispatch(setLaunches(launches));
  };

  const [upcomingStatus, setUpcomingStatus] = useState<boolean>(false);

  const handleFilterByUpcoming = (event: ChangeEvent<HTMLInputElement>) => {
    setUpcomingStatus(event.target.checked);
    filterLaunches(filterName, selectedStatus === options[1], filterDate, event.target.checked);
  };

  return (
    <div>
      {
            filterDate || filterName || selectedStatus || upcomingStatus
              ? <button onClick={clearFilters} type="submit">Clear Filters</button>
              : null
        }

      <p>
        filterName:
        {' '}
        {filterName}
      </p>

      <p>
        filterDate:
        {' '}
        {filterDate}
      </p>

      <p>
        selectedStatus
        {' '}
        {selectedStatus}
      </p>

      <p>
        upcomingStatus
        {' '}
        {upcomingStatus}
      </p>

      <input onChange={handleFilterByName} placeholder="filter by name" value={filterName} />

      <select value={selectedStatus} onChange={handleFilterByStatus}>
        <option value="success">Successful</option>
        <option value="failure">Failure</option>
      </select>

      <select value={filterDate} onChange={handleFilterByDate}>
        <option value="">Filter by date</option>
        <option value="lastWeek">Last week</option>
        <option value="lastMonth">Last month</option>
        <option value="lastYear">Last year</option>
      </select>

      <label htmlFor="upcomingStatus">
        <input type="checkbox" onChange={handleFilterByUpcoming} />
        Upcoming
      </label>

    </div>
  );
}
