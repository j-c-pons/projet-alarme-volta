import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useGlobalContext } from "../context/appContext";
import {btnSx} from '../style/form'
import {DAYS} from '../utils/functions'

const ToggleDays:React.FunctionComponent = () =>{
    const alarmCtx= useGlobalContext();
    const handleDays = (event: React.MouseEvent<HTMLElement>, newDay: string,) => {
        if(newDay==="L/D"|| newDay==="L/V"){
            alarmCtx.setDays([newDay]);
        } else if(alarmCtx.days.includes("L/D") || alarmCtx.days.includes("L/V")){
            alarmCtx.setDays((curr)=> [...curr.filter(d=> d!="L/D").filter(d=>d!="L/V"), newDay]);
        } else if(!alarmCtx.days.includes(newDay)){
            alarmCtx.setDays((curr)=> [...curr, newDay]);
        } else {
            alarmCtx.setDays((curr)=> curr.filter(d=> d!=newDay));
        }
    };

  return (
        <ToggleButtonGroup
            sx={btnSx}
            value={alarmCtx.days}
            exclusive
            onChange={handleDays}
            aria-label="text alignment"
        >
            {DAYS.map((day, index) => (
                <ToggleButton  key={day.key} value={day.label} aria-label={day.key} >
                    {day.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>

  );
}

export default ToggleDays;
