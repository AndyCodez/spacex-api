import React, { } from 'react';
import { useDispatch } from 'react-redux';
import { } from '../store';
import { setLaunches } from '../store/slices/launchesSlice';

// interface FilterProps {
//   setFilteredData: Function,
// }

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
//   const launches = useSelector((state: RootState) => state.launches);

  //   const [filteredData, setFilteredData] = useState<Launch[]>(launches);

  const launchesJson = localStorage.getItem('allLaunches');

  //   const launches: Launch[] = launchesJson ? JSON.parse(launchesJson) : [];

  //   console.log(launchesJson);

  //   const [filtered] = useState(launches);
  //   const filteredLaunches = useSelector((state: RootState) => state.launches);
  const dispatch = useDispatch();

  const filterByName = (filterName: string) => {
    const launches: Launch[] = launchesJson ? JSON.parse(launchesJson) : [];

    const filteredLaunches = launches.filter((launch) => (
      filterName.trim().length > 0 ? launch.name.includes(filterName) : launches));

    dispatch(setLaunches(filteredLaunches));
    // setFilteredData(filteredLaunches);

    // console.log(filteredLaunches);
    console.log(filteredLaunches);
  };

  return (
    <div>

      <input onChange={(e) => filterByName(e.target.value)} placeholder="filter by name" />

    </div>
  );
}
