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
  success: string;
  upcoming: boolean;
}

export default function Filter() {
  const launchesJson = localStorage.getItem('allLaunches');

  const dispatch = useDispatch();
  const launches: Launch[] = launchesJson ? JSON.parse(launchesJson) : [];

  const [selectedStatus, setSelectedStatus] = useState('');

  const filterLaunches = (
    filterName?: string,
    filterStatus?: string,
    filterDate?: string,
    filterUpcoming?: boolean,
  ) => {
    let filteredLaunches = launches;

    if (filterName && filterName.trim().length > 0) {
      filteredLaunches = filteredLaunches.filter(
        (launch) => launch.name.toLowerCase().includes(filterName.toLowerCase()),
      );
    }

    if (filterStatus) {
      filteredLaunches = filteredLaunches.filter(
        (launch) => filterStatus.toLowerCase() === launch.success.toLowerCase(),
      );
    }

    if (filterDate) {
      filteredLaunches = filteredLaunches.filter((launch) => {
        const launchDate = new Date(launch.date_utc);
        const currentDate = new Date();

        switch (filterDate) {
          case 'lastWeek':
            return launchDate > new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
          case 'lastMonth':
            return (
              launchDate
              > new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                currentDate.getDate(),
              )
            );
          case 'lastYear':
            return (
              launchDate
              > new Date(
                currentDate.getFullYear() - 1,
                currentDate.getMonth(),
                currentDate.getDate(),
              )
            );
          default:
            return true;
        }
      });
    }

    if (filterUpcoming !== undefined) {
      filteredLaunches = filteredLaunches.filter(
        (launch) => filterUpcoming === launch.upcoming,
      );
    }

    dispatch(setLaunches(filteredLaunches));
  };

  const [filterName, setFilterName] = useState('');

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    filterLaunches(event.target.value);
  };

  const handleFilterByStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    filterLaunches(filterName, event.target.value);
  };

  const [filterDate, setFilterDate] = useState('');

  const handleFilterByDate = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterDate(event.target.value);
    filterLaunches(filterName, selectedStatus, event.target.value);
  };

  const [upcomingStatus, setUpcomingStatus] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>();

  const handleFilterByUpcoming = (event: ChangeEvent<HTMLInputElement>) => {
    setUpcomingStatus(event.target.checked);
    filterLaunches(filterName, selectedStatus, filterDate, event.target.checked);
  };

  const clearFilters = () => {
    setFilterName('');
    setFilterDate('');
    setSelectedStatus('');
    setUpcomingStatus(false);
    setIsChecked(false);

    dispatch(setLaunches(launches));
  };

  return (
    <div className="flex justify-center">
      <div className="mr-4">
        {filterDate || filterName || selectedStatus || upcomingStatus ? (
          <button
            onClick={clearFilters}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Clear Filters
          </button>
        ) : null}
      </div>

      <div className="mr-4">
        <input
          onChange={handleFilterByName}
          value={filterName}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Filter by name"
        />
      </div>

      <div className="mr-4">
        <select
          value={selectedStatus}
          onChange={handleFilterByStatus}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="successful">Successful</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="mr-4">
        <select
          value={filterDate}
          onChange={handleFilterByDate}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Filter by date</option>
          <option value="lastWeek">Last week</option>
          <option value="lastMonth">Last month</option>
          <option value="lastYear">Last year</option>
        </select>
      </div>

      <div className="mr-4">
        <label
          htmlFor="upcomingStatus"
          className="inline-flex items-center"
        >
          <input
            type="checkbox"
            onChange={handleFilterByUpcoming}
            id="upcomingStatus"
            checked={isChecked}
            className="form-checkbox h-5 w-5 text-gray-600"
          />
          <span className="ml-2 text-gray-700">Upcoming</span>
        </label>
      </div>

    </div>
  );
}
