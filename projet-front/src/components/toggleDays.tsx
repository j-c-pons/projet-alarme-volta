import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const ToggleButtons:React.FunctionComponent = ({}) =>{
  const [days, setDays] = useState<string[]>([]);
  const DAYS = [
    {
      key: "lundi",
      label: "L"
    },
    {
      key: "mardi",
      label: "Ma"
    },
    {
      key: "mercredi",
      label: "Me"
    },
    {
      key: "jeudi",
      label: "J"
    },
    {
      key: "vendredi",
      label: "V"
    },
    {
      key: "samedi",
      label: "S"
    },
    {
      key: "dimanche",
      label: "D"
    },
    {
      key:"lundi-dimanche",
      label:"L/D"
    },
    {
      key:"lundi-vendredi",
      label:"L/V"
    }
  ];

  const buttonSX = {
    borderRadius:50,

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
    }
  };


  const handleDays = (event: React.MouseEvent<HTMLElement>, newDay: string,) => {
    if(!days.includes(newDay)){
        setDays((curr)=> [...curr, newDay]);
    } else {
        setDays((curr)=> curr.filter(d=> d!=newDay));
    }
  };

  return (
        <ToggleButtonGroup
        sx={buttonSX}
        value={days}
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
