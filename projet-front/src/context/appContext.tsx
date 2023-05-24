import React, { createContext, useContext, useEffect, useState } from "react";
import {Alarm} from "../type/Alarm";

let ring1 = new Audio("https://bigsoundbank.com/UPLOAD/mp3/0173.mp3");
let ring2 = new Audio("http://icecast.radiofrance.fr/fip-midfi.mp3");

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
  alarmID:number
  setAlarmID:React.Dispatch<React.SetStateAction<number>>
  startAlarm:(sonnerie:string)=>void
  pauseAlarm:() => "Sonnerie classique" | "Sonnerie FM" |""
  selectedSound:string
  setselectedSound:React.Dispatch<React.SetStateAction<string>>
  snoozeAlarm:()=>void
  timezone:string
  setTimezone:React.Dispatch<React.SetStateAction<string>>
  snooze: boolean
  setSnooze:React.Dispatch<React.SetStateAction<boolean>>
  // 
  hourDigital:string
  minutesDigital:string
  dayNow:string
  monthNow:string
  yearNow:string
  alarmTime:string
  setAlarmTime: React.Dispatch<React.SetStateAction<string>>
}


export const AlarmContext = createContext<ctxInterface>({} as ctxInterface);

const ContextAlarmProvider = ({ children }:Props) => {
  const [days, setDays] = useState<string[]>(['L/D']);
  const [data, setData] = useState<Alarm[]>([]);
  const [hasAlarm, setHasAlarm] = useState(false);
  const [time, setTime] = useState(new Date());
  const [hourDigital, setHourDigital] = useState("");
  const [minutesDigital, setMinutesDigital] = useState("");
  const [alarmID, setAlarmID] = useState(-1);
  const [timezone, setTimezone] = useState("Europe/Brussels");
  const [snooze, setSnooze] = useState(false);

  // TODO:  snooze, style modal alarm, gestion des jours, style timezone

  const [dayNow, setDayNow] = useState("");
  const [monthNow, setMonthNow] = useState("");
  const [yearNow, setYearNow] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [selectedSound, setselectedSound] = useState("");


 

  const startAlarm = (sonnerie:string) => {
    console.log("start2", hasAlarm) 

    if(!hasAlarm){
      console.log("selected sonnerie", sonnerie)
      if(sonnerie==="Sonnerie classique"){
        ring1.play();
        ring1.loop = true;
        setHasAlarm(true)
      } else if (sonnerie==="Sonnerie FM"){
        ring2.play();
        setHasAlarm(true)
      } else {
        console.log("nope")
      }
    }
  }


  const pauseAlarm = () => {
    setHasAlarm(false);
    if(!ring1.paused){
      ring1.pause();
      ring1.currentTime=0;
      ring1.loop = false;
      return "Sonnerie classique";
    } else if (!ring2.paused){
      ring2.pause();
      return "Sonnerie FM";
    } else {
      console.log("bad return")
      return"";
    }
  };


  const snoozeAlarm = () => {
    let sonnerie = pauseAlarm()
    setHasAlarm(false); 
    console.log("test11111", hasAlarm)
    const timer = setTimeout(() => {
      console.log("start", hasAlarm) 
      startAlarm(sonnerie);
    }, 9000);

    // }, 300000);
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
        alarmID, 
        setAlarmID,
        startAlarm,
        pauseAlarm,
        selectedSound,
        setselectedSound,
        snoozeAlarm,
        timezone, 
        setTimezone,
        snooze, 
        setSnooze,
        // 
        hourDigital,
        minutesDigital,
        dayNow,
        monthNow,
        yearNow,
        alarmTime,
        setAlarmTime,
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