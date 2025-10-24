import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// @ts-ignore
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import {format} from 'date-fns/format'
import {parse} from 'date-fns/parse'
import {startOfWeek} from 'date-fns/startOfWeek'
import {getDay} from 'date-fns/getDay'
import {enUS} from 'date-fns/locale/en-US'
import BarGraph from './components/BarGraph';
import { addDays, startOfDay } from 'date-fns';

const dummy_data = {
  "01-10-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ],
  "02-10-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ],
  "03-10-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ],
  "04-10-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ]
}

interface CalendarData {
  id: number;
  title: string;
  start: Date;
  end: Date;
  value: number;
}

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

const calendarEvents = transformDummyData(dummy_data);

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const App = (props:any) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState<any[] | null>(null);
  const [showNoDataPopup, setShowNoDataPopup] = useState(false);

  const handleSelectEvent = (event: any) => {
    const dateEvents = calendarEvents.filter(
      (dataEvent) => dataEvent.start.toDateString() === event.start.toDateString()
    );

    if (dateEvents.length > 0) {
      const formattedData = dateEvents.map(ev => ({ [ev.title]: ev.value }));
      setPopupData(formattedData);
      setShowPopup(true);
      setShowNoDataPopup(false);
    } else {
      setShowNoDataPopup(true);
      setShowPopup(false);
      setPopupData(null);
    }
    setSelectedDate(event.start);
  };

  const eventPropGetter = (event: any, start: Date, end: Date, isSelected: boolean) => {
    let newStyle = {
      backgroundColor: "#3174ad",
      color: 'black',
      borderRadius: "0px",
      border: "none"
    };

    if (selectedDate && start.toDateString() === selectedDate.toDateString()) {
      newStyle.backgroundColor = "lightblue";
    }

    return {
      className: "",
      style: newStyle
    };
  };

  return (
    <div className='py-20'>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={(slotInfo:any) => {
          const clickedDate = slotInfo.start;
          setSelectedDate(clickedDate);
          setShowPopup(false);
          setPopupData(null);

          const dateEvents = calendarEvents.filter(
            (dataEvent) => dataEvent.start.toDateString() === clickedDate.toDateString()
          );

          if (dateEvents.length === 0) {
            setShowNoDataPopup(true);
          } else {
            setShowNoDataPopup(false);
          }
        }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventPropGetter}
      />

      {showPopup && popupData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <BarGraph data={popupData} />
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showNoDataPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white text-center">
            <p className="text-lg font-bold">No data found for the selected date.</p>
            <button
              onClick={() => setShowNoDataPopup(false)}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default App
