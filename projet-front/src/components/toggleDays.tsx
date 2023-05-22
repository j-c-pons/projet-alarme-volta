import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useGlobalContext } from "../context/appContext";

const ToggleButtons:React.FunctionComponent = ({}) =>{
    const alarmCtx= useGlobalContext();

//   const [days, setDays] = useState<string[]>(['L/D']);
  const DAYS = [
    {
      key: "Lundi",
      label: "L"
    },
    {
      key: "Mardi",
      label: "Ma"
    },
    {
      key: "Mercredi",
      label: "Me"
    },
    {
      key: "Jeudi",
      label: "J"
    },
    {
      key: "Vendredi",
      label: "V"
    },
    {
      key: "Samedi",
      label: "S"
    },
    {
      key: "Dimanche",
      label: "D"
    },
    {
      key:"Lundi-Dimanche",
      label:"L/D"
    },
    {
      key:"Lundi-Vendredi",
      label:"L/V"
    }
  ];

  const buttonSX = {
    borderRadius:50,
    paddingTop:1,
    paddingBottom:1,
    color:'red',
    "& .MuiToggleButton-root":{
        color: 'red',
        width:30,
        height:30,
        borderRadius:50,
        marginRight:0.5,
        marginLeft:0.5,
        fontSize:10,
    },
    "& .MuiToggleButton-root:hover":{
        borderRadius:50,
        background:"#ff000047",
    },
    "& .MuiToggleButton-root.Mui-selected":{
        color: 'black',
        background:"red",
        borderRadius:50
    },
    "& .MuiToggleButton-root.Mui-selected:hover":{
        background:"#ff000090 !important",

    }
  };


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
        sx={buttonSX}
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

export default ToggleButtons;
