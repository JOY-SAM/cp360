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
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { createSelector } from '@reduxjs/toolkit';
import {
  setDate,
  setView,
  setSelectedDate,
  setShowPopup,
  setPopupData,
  setShowNoDataPopup,
  type TransformedCalendarEvent, // Import the interface
} from './redux/slices/calendarSlice';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'en-US': enUS,
  },
})

const selectCalendarEvents = createSelector(
  (state) => state.calendar.calendarEvents,
  (calendarEvents) =>
    calendarEvents.map((event: TransformedCalendarEvent) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }))
);

const App = () => {
  const dispatch = useAppDispatch();
  const { date, view, selectedDate, showPopup, popupData, showNoDataPopup } = useAppSelector((state) => state.calendar);

  const calendarEvents: TransformedCalendarEvent[] = useAppSelector(selectCalendarEvents);

  const handleSelectEvent = (event: TransformedCalendarEvent) => {
    const dateEvents = calendarEvents.filter(
      (dataEvent) => dataEvent.start.toDateString() === event.start.toDateString()
    );

    if (dateEvents.length > 0) {
      const formattedData = dateEvents.map((ev) => ({
          [ev.title]: ev.value
        }));
      dispatch(setPopupData(formattedData));
      dispatch(setShowPopup(true));
      dispatch(setShowNoDataPopup(false));
    } else {
      dispatch(setShowNoDataPopup(true));
      dispatch(setShowPopup(false));
      dispatch(setPopupData(null));
    }
    dispatch(setSelectedDate(event.start.toISOString()));
  };

  const eventPropGetter = (_event: TransformedCalendarEvent, start: Date) => {
    let newStyle = {
      backgroundColor: "#3174ad",
      color: 'black',
      borderRadius: "0px",
      border: "none"
    };

    if (selectedDate && start.toDateString() === new Date(selectedDate).toDateString()) {
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
          dispatch(setSelectedDate(clickedDate.toISOString()));
          dispatch(setShowPopup(false));
          dispatch(setPopupData(null));

          const dateEvents = calendarEvents.filter(
            (dataEvent) => dataEvent.start.toDateString() === clickedDate.toDateString()
          );

          if (dateEvents.length === 0) {
            dispatch(setShowNoDataPopup(true));
          } else {
            dispatch(setShowNoDataPopup(false));
          }
        }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventPropGetter}
        date={new Date(date)}
        view={view}
        onNavigate={(newDate: Date) => dispatch(setDate(newDate))}
        onView={(newView: string) => dispatch(setView(newView))}
      />

      {showPopup && popupData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <BarGraph data={popupData} />
            <button
              onClick={() => dispatch(setShowPopup(false))}
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
              onClick={() => dispatch(setShowNoDataPopup(false))}
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
export default App;
