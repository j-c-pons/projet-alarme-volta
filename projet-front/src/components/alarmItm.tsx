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
import HasAlarmModal from "./modals/hasAlarmModal";
import  {checkStyle, uncheckStyle} from '../style/check'
import {getTimeDiff} from '../utils/functions'
import ToggleButtons from './toggleDays'

interface alarmProps { 
  (id: number): void
}

const AlarmItm: React.FunctionComponent<{item:Alarm, removeAlarm:alarmProps, chromeCheck:Boolean}> = ({item, removeAlarm, chromeCheck}) => {
    const alarmCtx= useGlobalContext();
    // const [alarmTime, setAlarmTime] = useState(item.time)
    const [checked, setChecked] = useState(true);
    // const [hourDigital, setHourDigital] = useState("");
    // const [minutesDigital, setMinutesDigital] = useState("");
    // const [time, setTime] = useState(new Date());
    // const [alarmStopped, setAlarmStopped] = useState(false);
    // const alarmRef = useRef(false);
    // const [displayAlarm, setDisplayAlarm] = useState(false);


    useEffect(() => {
      //  switch off alarms on load
      //console.log("item.active", item.active)
      if(item.active===false || !chromeCheck){
        setChecked(false)
      };
    }, []);

    useEffect(() => {
      //  set alarm time out
        let delay = getTimeDiff(item.time, alarmCtx.timezone)
        const timerAlarm = setTimeout(() => {
          if(checked){
              alarmCtx.startAlarm(item.sonnerie)
          }
        }, delay)

        return () => {
          clearTimeout(timerAlarm);
        };
  
    }, [checked, alarmCtx.timezone]);
 

    const handleChange = (val:boolean) => {
      console.log(val)
      setChecked(val)
      UsePutAlarmService(item.id, val);
    }

    const deleteAlarm=()=>{
      UseDeleteAlarmService(item.id)
      removeAlarm(item.id)
    }

    return <div className="clock"> 
      {item.time} 
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
    </div>
}

export default AlarmItm;