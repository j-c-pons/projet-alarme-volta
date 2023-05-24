import React, { useState, useEffect, useRef} from "react";
import {useGlobalContext} from '../context/appContext';
import {Alarm} from "../type/Alarm";
import ReactSwitch from 'react-switch';
import UsePutAlarmService from '../service/putAlarms'
import trash from '../assets/delete.png';
import UseDeleteAlarmService from '../service/deleteAlarm';
import '../style/clock.css';
import  {checkStyle, uncheckStyle} from '../style/check'
import {getTimeDiff, filterDayOfAlarm} from '../utils/functions'
import ToggleButtons from './toggleDays'

interface alarmItemProps {
  item:Alarm, 
  removeAlarm:(id: number)=> void 
  chromeCheck:Boolean, 
  startAlarmFn:(sonnerie:string)=>void
}

const AlarmItm: React.FunctionComponent<alarmItemProps> = ({item, removeAlarm, chromeCheck, startAlarmFn}) => {
    const alarmCtx= useGlobalContext();
    const [checked, setChecked] = useState(true);
    const [days, setDays] = useState(item.jours);
    const daysRref = useRef(false)

    useEffect(() => {
      //  switch off alarms on load
      if(item.active===false || !chromeCheck){
        setChecked(false)
      };
    }, []);

    useEffect(() => {
      if(daysRref.current){
        console.log("test")
        UsePutAlarmService(item.id, checked, days);
      }
    }, [days]);

    useEffect(() => {
      //  set alarm time out
        let delay = getTimeDiff(item.time, alarmCtx.timezone)
        const timerAlarm = setTimeout(() => {
          if(checked && filterDayOfAlarm(days)){
            startAlarmFn(item.sonnerie)
          }
        }, delay)

        return () => {
          clearTimeout(timerAlarm);
        };
  
    }, [checked, alarmCtx.timezone, days]);
 

    const handleChange = (val:boolean) => {
      setChecked(val)
      UsePutAlarmService(item.id, val, days);
    }

    const deleteAlarm=()=>{
      UseDeleteAlarmService(item.id)
      removeAlarm(item.id)
    }

    const handleDays = (event: React.MouseEvent<HTMLElement>, newDay: string) => {
      if(newDay==="L/D"|| newDay==="L/V"){
          setDays([newDay]);
      } else if(days.includes("L/D") || days.includes("L/V")){
          setDays((curr)=> [...curr.filter(d=> d!="L/D").filter(d=>d!=="L/V"), newDay]);
      } else if(!days.includes(newDay)){
          setDays((curr)=> [...curr, newDay]);
      } else {
          setDays((curr)=> curr.filter(d=> d!==newDay));
      }
      daysRref.current = true;
    };

    return <div className="alarmMenu clock"> 
      <div className="alarmTime">{item.time} </div>
      <ToggleButtons handleFn={handleDays} currValue={days}/>
      <ReactSwitch className="switchComp"
        checked={checked}
        onChange={handleChange}
        onColor="#ff0000"
        offColor="#ff0000"
        height={30}
        width={65}
        handleDiameter={28}
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