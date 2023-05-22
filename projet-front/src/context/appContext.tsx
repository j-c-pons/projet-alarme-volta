import React, { createContext, useContext, useEffect, useState } from "react";
import {Alarm} from "../type/Alarm";
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
  days:string[]
  setDays:React.Dispatch<React.SetStateAction<string[]>>
  data:Alarm[]
  setData:React.Dispatch<React.SetStateAction<Alarm[]>>
  hasAlarm:boolean
  setHasAlarm:React.Dispatch<React.SetStateAction<boolean>>
  time:Date
  setTime:React.Dispatch<React.SetStateAction<Date>>

  // 
  hourDigital:string
  minutesDigital:string
  amPm:string
  dayNow:string
  monthNow:string
  yearNow:string
  alarmTime:string
  setAlarmTime: React.Dispatch<React.SetStateAction<string>>
  pauseAlarm: any

}


export const AlarmContext = createContext<ctxInterface>({} as ctxInterface);

const ContextAlarmProvider = ({ children }:Props) => {
  const [days, setDays] = useState<string[]>(['L/D']);
  const [data, setData] = useState<Alarm[]>([]);
  const [hasAlarm, setHasAlarm] = useState(false);
  const [time, setTime] = useState(new Date());

  // 
  const [hourDigital, setHourDigital] = useState("");
  const [minutesDigital, setMinutesDigital] = useState("");
  const [amPm, setAmPm] = useState("");
  const [dayNow, setDayNow] = useState("");
  const [monthNow, setMonthNow] = useState("");
  const [yearNow, setYearNow] = useState("");
  const [alarmTime, setAlarmTime] = useState("");

  useEffect(() => {
    setInterval(() => {

      const timer = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
      // let date = new Date();

      // let HH:string|number = date.getHours(),
      //   MM:string|number = date.getMinutes(),
      //   day = date.getDate(),
      //   month = date.getMonth(),
      //   year = date.getFullYear(),
      //   ampm;

      // if (HH >= 12) {
      //   HH = HH - 12;
      //   ampm = "PM";
      // } else {
      //   ampm = "AM";
      // }

      // if (HH === 0) HH = 12;
      // if (HH < 10) HH = `0${HH}`;
      // if (MM < 10) MM = `0${MM}`;

      // setHourDigital(HH.toString());
      // setMinutesDigital(MM.toString());
      // setAmPm(ampm);
      // setDayNow(day.toString());
      // setMonthNow(months[month]);
      // setYearNow(year.toString());
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
        days,
        setDays,
        data,
        setData,
        time,
        setTime,
        // 
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