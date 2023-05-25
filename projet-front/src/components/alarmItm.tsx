import { useState, useEffect, useRef} from "react";
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
  item:Alarm
  removeAlarm:(id: number)=> void 
  startAlarmFn:(sonnerie:string)=>void
}

const AlarmItm: React.FunctionComponent<alarmItemProps> = ({item, removeAlarm, startAlarmFn}) => {
    const alarmCtx= useGlobalContext();
    const [checked, setChecked] = useState(item.active);
    const [days, setDays] = useState(item.jours);
    const updateRef = useRef(false)

    // update db if selected days change
    useEffect(() => {
      if(updateRef.current){
        UsePutAlarmService(item.id, checked, days);
      }
    }, [item.id, checked, days]);

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
 
    // update db if active change
    const handleChange = (val:boolean) => {
      setChecked(val)
      updateRef.current = true;
    }

    const deleteAlarm=()=>{
      UseDeleteAlarmService(item.id)
      removeAlarm(item.id)
    }

    // callback fn for toggleDay component, updates the active days of the alarm
    const handleDays = (event: React.MouseEvent<HTMLElement>, newDay: string) => {
      if(newDay==="L/D"|| newDay==="L/V"){
          setDays([newDay]);
      } else if(days.includes("L/D") || days.includes("L/V")){
          setDays((curr)=> [...curr.filter(d=> d!=="L/D").filter(d=>d!=="L/V"), newDay]);
      } else if(!days.includes(newDay)){
          setDays((curr)=> [...curr, newDay]);
      } else {
          setDays((curr)=> curr.filter(d=> d!==newDay));
      }
      updateRef.current = true;
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
        activeBoxShadow={"1px #ff0000"} 
        uncheckedIcon={
          <div style={uncheckStyle}>Off</div>
        }
        checkedIcon={
          <div style={checkStyle}>On</div>
        }
      />
      <img className="deleteBtn" src={trash} alt="poubelle" onClick={deleteAlarm} />
    </div>
}

export default AlarmItm;