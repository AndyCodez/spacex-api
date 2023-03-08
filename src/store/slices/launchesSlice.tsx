import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const LaunchState: Launch[] = [{
  id: 0,
  flight_number: 0,
  name: '',
  date_utc: '',
  static_fire_date_utc: '',
  rocket: '',
  success: false,
  upcoming: false,
}];

const launchesSlice = createSlice({
  name: 'launches',
  initialState: LaunchState,
  reducers: {
    setLaunches: (state, action: PayloadAction<Launch[]>) => action.payload,
  },
});

export const { setLaunches } = launchesSlice.actions;

export default launchesSlice.reducer;
