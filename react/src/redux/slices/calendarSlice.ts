import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addDays } from 'date-fns';

interface CalendarData {
  id: number;
  title: string;
  start: Date;
  end: Date;
  value: number;
}

interface CalendarState {
  date: string;
  view: string;
  selectedDate: string | null;
  showPopup: boolean;
  popupData: any[] | null;
  showNoDataPopup: boolean;
  calendarEvents: CalendarData[];
}

const dummy_data = {
  "01-9-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ],
  "02-9-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ],
  "03-9-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ],
  "04-9-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ]
};

const transformDummyData = (data: typeof dummy_data): CalendarData[] => {
  const transformedData: CalendarData[] = [];
  let idCounter = 0;

  for (const dateString in data) {
    if (Object.prototype.hasOwnProperty.call(data, dateString)) {
      const [day, month, year] = dateString.split('-').map(Number);
      const eventDate = new Date(year, month - 1, day);

      // @ts-ignore
      data[dateString].forEach(eDate => {
        const title = Object.keys(eDate)[0];
        const value = Object.values(eDate)[0];
        transformedData.push({
          id: idCounter++,
          title: title,
          start: eventDate,
          end: addDays(eventDate, 1),
          // @ts-ignore
          value: value ,
        });
      });
    }
  }
  return transformedData;
};

const initialCalendarEvents = transformDummyData(dummy_data);

const initialState: CalendarState = {
  date: new Date(2025, 8, 1).toISOString(), // September 1, 2025
  view: 'month',
  selectedDate: null,
  showPopup: false,
  popupData: null,
  showNoDataPopup: false,
  calendarEvents: initialCalendarEvents,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload.toISOString();
    },
    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<Date | null>) => {
      state.selectedDate = action.payload ? action.payload.toISOString() : null;
    },
    setShowPopup: (state, action: PayloadAction<boolean>) => {
      state.showPopup = action.payload;
    },
    setPopupData: (state, action: PayloadAction<any[] | null>) => {
      state.popupData = action.payload;
    },
    setShowNoDataPopup: (state, action: PayloadAction<boolean>) => {
      state.showNoDataPopup = action.payload;
    },
  },
});

export const {
  setDate,
  setView,
  setSelectedDate,
  setShowPopup,
  setPopupData,
  setShowNoDataPopup,
} = calendarSlice.actions;

export default calendarSlice.reducer;
