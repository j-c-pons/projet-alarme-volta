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
  pauseAlarm:()=>void
  selectedSound:string
  setselectedSound:React.Dispatch<React.SetStateAction<string>>
  // 
  hourDigital:string
  minutesDigital:string
  amPm:string
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

  // TODO: mettre en pause, snooze, style modal alarm, gestion des jours, style timezone

  const [amPm, setAmPm] = useState("");
  const [dayNow, setDayNow] = useState("");
  const [monthNow, setMonthNow] = useState("");
  const [yearNow, setYearNow] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [selectedSound, setselectedSound] = useState("");


  useEffect(()=>{

    let ignore = false;
    if(!ignore){




    if(hasAlarm){
      console.log("selected", selectedSound)
      if(selectedSound==="Sonnerie classique" && ring1.paused){
        ring1.play();
        ring1.loop = true;
      } else if (ring2.paused){
        ring2.play();
      }
    } else {
      if(selectedSound==="Sonnerie classique"){
        ring1.pause();
        ring1.currentTime=0;
      } else {
        ring2.pause();
      } 
    }

  }
    return () => {
        ignore = true;
    };

  }, [hasAlarm]);


  const pauseAlarm = () => {
    setHasAlarm(false);
  };

  // useEffect(() => {
  //       const timer2 = setInterval(() => {
  //         setTime(new Date());
  //       }, 1000)

  //   const timer = setTimeout(() => {
  //       console.log('alarm stat ', hasAlarm)

  //       if(!hasAlarm){

  //         let date = new Date();
  //         let HH:string|number = date.getHours()
  //         let MM:string|number = date.getMinutes()
  //         if (HH < 10) HH = `0${HH}`;
  //         if (MM < 10) MM = `0${MM}`;
  //         let hourDigital = HH.toString();
  //         let minutesDigital = MM.toString();
  //         console.log("current data ", data)
  //         data.forEach((elt)=>{
  //             if(elt.time===`${hourDigital}:${minutesDigital}` && elt.active){
  //               // alarm.play();
  //               // console.log("hasAlarm", hasAlarm)
  //               console.log("ALARME DECLENCHEE")
  //               setHasAlarm(true);
  //               setAlarmID(elt.id)
  //               // alarm.loop = true;
  //             }
  //           })  
  //       }

 


  //   }, 1000);

  //   return () => {
  //     clearTimeout(timer);
  //           clearInterval(timer2);

  //   };
  // }, [hasAlarm, data, time]);

  // useEffect(() => {
  //   const timer = setInterval(() => {

  //     setHasAlarm((currentAlarm)=>
  //     {
  //       console.log('alarm stat ', currentAlarm)
  //       if(!currentAlarm){

  //         let date = new Date();
  //         // setTime(date)
  //         let HH:string|number = date.getHours()
  //         let MM:string|number = date.getMinutes()
  //         if (HH < 10) HH = `0${HH}`;
  //         if (MM < 10) MM = `0${MM}`;
  //         let hourDigital = HH.toString();
  //         let minutesDigital = MM.toString();

  //         setData((currData)=>
  //         {
  //           console.log('current data', currData)
  //           currData.forEach((elt)=>{
  //             if(elt.time===`${hourDigital}:${minutesDigital}` && elt.active){
  //               // alarm.play();
  //               // console.log("hasAlarm", hasAlarm)
  //               console.log("ALARME DECLENCHEE")
  //               // setHasAlarm(prev=>!prev);
  //               alarm.loop = true;
  //               return true;
  //             }
  //           })  
  //           return currData;
  //         })
  //       }
  //       return currentAlarm;

  //     })
 


  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);


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
        pauseAlarm,
        selectedSound,
        setselectedSound,
        // 
        hourDigital,
        minutesDigital,
        amPm,
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