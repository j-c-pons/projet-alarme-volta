import React, { useContext, useState, useEffect, useRef } from "react";
import {useGlobalContext} from '../context/appContext';
import useGetAlarmsService from '../service/getAlarms';
import {Service,ServiceLoaded, Alarm} from "../type/Alarm";
import ReactSwitch from 'react-switch';
import UsePutAlarmService from '../service/putAlarms'
import Sound from "../alarm-sound.mp3";
import trash from '../delete.png';
import UseDeleteAlarmService from '../service/deleteAlarm';
import '../style/clock.css';

interface alarmProps {
  (id: number): void
}
const alarm = new Audio(Sound);
// http://icecast.radiofrance.fr/fip-midfi.mp3

const AlarmItm: React.FunctionComponent<{stat:Alarm, removeAlarm:alarmProps, chromeCheck:Boolean}> = ({stat, removeAlarm, chromeCheck}) => {
    const alarmCtx= useGlobalContext();
    const [alarmTime, setAlarmTime] = useState(stat.time)
    const [checked, setChecked] = useState(true);
    const [hourDigital, setHourDigital] = useState("");
    const [minutesDigital, setMinutesDigital] = useState("");
    // const [hasAlarm, setHasAlarm] = useState(false);
    const [alarmStopped, setAlarmStopped] = useState(false);
    const alarmRef = useRef(false);

  // const alarmCtx= useGlobalContext();
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


    //console.log("chromeCheck", chromeCheck)
    if (alarmTime === `${hourDigital}:${minutesDigital}` && checked && !alarmCtx.hasAlarm && !alarmStopped) {
      alarm.play();
      alarmCtx.setHasAlarm(true);
      alarmRef.current = true;
      alarm.loop = true;
    }

    const pauseAlarm = () => {
      alarm.pause();
      alarm.currentTime=0;
      alarmCtx.setHasAlarm(false)
      setAlarmStopped(true)
      // alarmRef.current = false;
      // console.log("ref", alarmRef)
      //setAlarmTime("");
    };

    const handleChange = (val:boolean) => {
      setChecked(val)
      UsePutAlarmService(stat.id, val);
    }

    const deleteAlarm=()=>{
      alarm.pause();
      alarm.currentTime=0;
      UseDeleteAlarmService(stat.id)
      removeAlarm(stat.id)
    }

    return <div className="clock"> {stat.time} 
      <ReactSwitch className="switchComp"
        checked={checked}
        onChange={handleChange}
        onColor="#ff0000"
        offColor="#ff0000"
        height={20}
        handleDiameter={16}
        uncheckedIcon={
          <div
            style={{
              position:"absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 15,
              color: "black",
              paddingRight: 2
            }}
          >
            Off
          </div>
        }
        checkedIcon={
          <div
            style={{
              position:"absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 15,
              color: "black",
              paddingLeft: 10
            }}
          >
            On
          </div>
        }
      />
      <img src={trash} alt="poubelle" onClick={deleteAlarm} style={{height:"20px"}} />
      { alarmCtx.hasAlarm &&
        <img src={trash} alt="poubelle" onClick={pauseAlarm} style={{height:"20px"}} />
      }
    </div>

}

export default AlarmItm;