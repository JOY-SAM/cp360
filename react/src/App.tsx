import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import {format} from 'date-fns/format'
import {parse} from 'date-fns/parse'
import {startOfWeek} from 'date-fns/startOfWeek'
import {getDay} from 'date-fns/getDay'
import {enUS} from 'date-fns/locale/en-US'


const dummy_data = {
  "01-09-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ],
  "02-09-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ],
  "03-09-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ],
  "04-09-2025": [
      {"user_1": 1},
      {"user_2": 2},
      {"user_3": 3},
      {"user_4": 4},
  ]
}
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

const App = (props:any) => (
  <div>
    <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)
export default App
