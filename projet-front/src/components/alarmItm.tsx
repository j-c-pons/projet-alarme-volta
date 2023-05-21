import React, { useContext, useState, useEffect, useRef } from "react";
import {useGlobalContext} from '../context/appContext';
import useGetAlarmsService from '../service/getAlarms';
import {Service,ServiceLoaded, Alarm} from "../type/Alarm";
import ReactSwitch from 'react-switch';
import UsePutAlarmService from '../service/putAlarms'
import Sound from "../alarm-sound.mp3";
import trash from '../delete.png';
import UseDeleteAlarmService from '../service/deleteAlarm';

interface alarmProps {
  (id: number): void
}

const AlarmItm: React.FunctionComponent<{stat:Alarm, removeAlarm:alarmProps, chromeCheck:Boolean}> = ({stat, removeAlarm, chromeCheck}) => {
  const [alarmTime, setAlarmTime] = useState(stat.time)
  const [checked, setChecked] = useState(true);
  const [hourDigital, setHourDigital] = useState("");
  const [minutesDigital, setMinutesDigital] = useState("");
  const [hasAlarm, setHasAlarm] = useState(false);
  const alarmRef = useRef(false);

  // const alarmCtx= useGlobalContext();
   const alarm = new Audio(Sound);
  //  alarm.muted = true;
 // const alarm = new Audio("https://audio.bfmtv.com/bfmbusiness_128.mp3?aw_0_1st.playerId=AudioPlayer_Web_Next");


    useEffect(() => {
      setInterval(() => {
        let date = new Date();

        let HH:string|number = date.getHours()
        let MM:string|number = date.getMinutes()
  
        if (HH < 10) HH = `0${HH}`;
        if (MM < 10) MM = `0${MM}`;
  
        setHourDigital(HH.toString());
        setMinutesDigital(MM.toString());

      }, 1000);


      // if(stat.active==="false" || chromeCheck){
      if(stat.active==="false"){
        setChecked(false)
      };
    }, []);

    // if (alarmTime === `${hourDigital}:${minutesDigital}` && stat.active) {
    //   console.log("test")
    //   alarm.play();
    //   alarm.loop = true;
    // }
    //console.log("chromeCheck", chromeCheck)
    if (alarmTime === `${hourDigital}:${minutesDigital}` && checked) {
      //console.log("test")
      alarm.play();
      alarmRef.current = true;
      // const promise = alarm.play();
      // if(promise !== undefined){
      //     promise.then(() => {
      //         // Autoplay started
      //         alarm.loop = true;
      //         console.log("ok")
      //     }).catch(error => {
      //         // Autoplay was prevented.
      //         // alarm.muted = true;
      //         // alarm.muted = false;
      //         console.log("error")
      //         //alarm.muted = true;

      //         alarm.play();
      //         alarm.loop = true;
      //     });
      // }



      alarm.loop = true;
    }

    const pauseAlarm = () => {
      alarm.pause();
      alarmRef.current = false;
      console.log("alll")
      //setAlarmTime("");
    };

    const handleChange = (val:boolean) => {
      setChecked(val)
      UsePutAlarmService(stat.id, val);
    }

    const deleteAlarm=()=>{
      UseDeleteAlarmService(stat.id)
      removeAlarm(stat.id)
    }

    return <div> {stat.time} 
          <ReactSwitch
        checked={checked}
        onChange={handleChange}
        onColor="#eb4034"
        onHandleColor	="#eb4034"
      />
      <img src={trash} alt="poubelle" onClick={deleteAlarm} style={{height:"20px"}} />
      { alarmRef.current?(
        <img src={trash} alt="poubelle" onClick={pauseAlarm} style={{height:"20px"}} />
      ):(
        <span></span>
      )}
    </div>

}

export default AlarmItm;