import React, { useContext, useState, useEffect, useRef} from "react";
import {useGlobalContext} from '../context/appContext';
import useGetAlarmsService from '../service/getAlarms';
import {Service,ServiceLoaded, Alarm} from "../type/Alarm";
import ReactSwitch from 'react-switch';
import UsePutAlarmService from '../service/putAlarms'
// import Sound from "../alarm-sound.mp3";
import trash from '../delete.png';
import UseDeleteAlarmService from '../service/deleteAlarm';
import '../style/clock.css';
import HasAlarmModal from "./hasAlarmModal";
import  {checkStyle, uncheckStyle} from '../style/check'
// const classicRing = "../../alarm-clock-short-6402.mp3"; 

interface alarmProps {
  (id: number): void
}
// const alarm = new Audio(Sound);
// http://icecast.radiofrance.fr/fip-midfi.mp3

const AlarmItm: React.FunctionComponent<{item:Alarm, removeAlarm:alarmProps, chromeCheck:Boolean}> = ({item, removeAlarm, chromeCheck}) => {
    const alarmCtx= useGlobalContext();
    const [alarmTime, setAlarmTime] = useState(item.time)
    const [checked, setChecked] = useState(true);
    const [hourDigital, setHourDigital] = useState("");
    const [minutesDigital, setMinutesDigital] = useState("");
    const [time, setTime] = useState(new Date());
    const [alarmStopped, setAlarmStopped] = useState(false);
    const alarmRef = useRef(false);
    const [displayAlarm, setDisplayAlarm] = useState(false);
    // console.log("try")

    useEffect(() => {
        // if(stat.active==="false" || chromeCheck){
        if(item.active==="false"){
          setChecked(false)
        };
    }, []);

    useEffect(() => {
      // console.log("test")

      const timer2 = setInterval(() => {
        setTime(new Date());
      }, 1000)

      const timer = setTimeout(() => {
          if(!alarmCtx.hasAlarm && item.active && !alarmStopped && checked){
            // console.log("try2")
            let date = new Date();
            let HH:string|number = date.getHours()
            let MM:string|number = date.getMinutes()
            if (HH < 10) HH = `0${HH}`;
            if (MM < 10) MM = `0${MM}`;
            let hourDigital = HH.toString();
            let minutesDigital = MM.toString();
            if(item.time===`${hourDigital}:${minutesDigital}`){
              alarmCtx.setHasAlarm(true);
              alarmCtx.setselectedSound(item.sonnerie);
              setDisplayAlarm(true);
              clearInterval(timer2)
            }
          }
  }, 1000);

  return () => {
    clearTimeout(timer);
    clearInterval(timer2);
  };
}, [alarmCtx.hasAlarm, time]);

    //console.log("chromeCheck", chromeCheck)
    // if (alarmTime === `${hourDigital}:${minutesDigital}` && checked && !alarmCtx.hasAlarm && !alarmStopped) {
    //   // alarm.play();
    //   console.log("ALARME DECLENCHEE")
    //   alarmCtx.setHasAlarm(true);
    //   alarmRef.current = true;
    //   alarm.loop = true;
    // }

    const stopAlarm = () => {
      // alarmCtx.setHasAlarm(false)
      setAlarmStopped(true)
      // alarmRef.current = false;
      // console.log("ref", alarmRef)
      //setAlarmTime("");
    };

    const snooze = (event: React.MouseEvent<HTMLElement>) => {
      console.log("ok")
      stopAlarm()
      const timer = setTimeout(() => {
        console.log("exp")
        if(!alarmCtx.hasAlarm && item.active && checked){
          if(item.time===`${hourDigital}:${minutesDigital}`){
            alarmCtx.setHasAlarm(true);
            setAlarmStopped(false);
            setDisplayAlarm(true);
          }
        }
      }, 300000);
    };

    const handleChange = (val:boolean) => {
      setChecked(val)
      UsePutAlarmService(item.id, val);
    }

    const deleteAlarm=()=>{
      UseDeleteAlarmService(item.id)
      removeAlarm(item.id)
    }

    return <div className="clock"> {item.time} 
      <ReactSwitch className="switchComp"
        checked={checked}
        onChange={handleChange}
        onColor="#ff0000"
        offColor="#ff0000"
        height={20}
        handleDiameter={16}
        uncheckedIcon={
          <div style={uncheckStyle}>Off</div>
        }
        checkedIcon={
          <div style={checkStyle}>On</div>
        }
      />
      <img src={trash} alt="poubelle" onClick={deleteAlarm} style={{height:"20px"}} />
      {displayAlarm &&
              <HasAlarmModal stopAlarm={stopAlarm} snooze={snooze} ring={item.sonnerie}/>
      }
    </div>
}

export default AlarmItm;