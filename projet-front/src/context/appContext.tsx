import React, { createContext, useContext, useEffect, useState } from "react";

const Sound = "../../alarm-clock-short-6402.mp3";
const alarm = new Audio(Sound);
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

interface Props{
  children: React.ReactNode;
}
export type ctxInterface = {
  hourDigital:string
  minutesDigital:string
  amPm:string
  dayNow:string
  monthNow:string
  yearNow:string
  alarmTime:string
  setAlarmTime: React.Dispatch<React.SetStateAction<string>>
  pauseAlarm: any
  hasAlarm:boolean
  setHasAlarm:React.Dispatch<React.SetStateAction<boolean>>
}
// export type TodoContextType = {
//   todos: ITodo[];
//   saveTodo: (todo: ITodo) => void;
//   updateTodo: (id: number) => void;
// };

export const AlarmContext = createContext<ctxInterface | null>(null);

const ContextAlarmProvider = ({ children }:Props) => {
  const [hourDigital, setHourDigital] = useState("");
  const [minutesDigital, setMinutesDigital] = useState("");
  const [amPm, setAmPm] = useState("");
  const [dayNow, setDayNow] = useState("");
  const [monthNow, setMonthNow] = useState("");
  const [yearNow, setYearNow] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [hasAlarm, setHasAlarm] = useState(false);

  useEffect(() => {
    setInterval(() => {
      let date = new Date();

      let HH:string|number = date.getHours(),
        MM:string|number = date.getMinutes(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        ampm;

      if (HH >= 12) {
        HH = HH - 12;
        ampm = "PM";
      } else {
        ampm = "AM";
      }

      if (HH === 0) HH = 12;
      if (HH < 10) HH = `0${HH}`;
      if (MM < 10) MM = `0${MM}`;

      setHourDigital(HH.toString());
      setMinutesDigital(MM.toString());
      setAmPm(ampm);
      setDayNow(day.toString());
      setMonthNow(months[month]);
      setYearNow(year.toString());
    }, 1000);
  }, []);

  if (alarmTime === `${hourDigital}:${minutesDigital} ${amPm}`) {
    console.log("no")
    alarm.play();
    alarm.loop = true;
  }

  const pauseAlarm = () => {
    alarm.pause();
    setAlarmTime("");
  };

  return (
    <AlarmContext.Provider
      value={{
        hourDigital,
        minutesDigital,
        amPm,
        dayNow,
        monthNow,
        yearNow,
        alarmTime,
        setAlarmTime,
        pauseAlarm,
        hasAlarm,
        setHasAlarm,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
}
export const useGlobalContext = () => useContext(AlarmContext)

export default ContextAlarmProvider;