
import { useState, useRef } from "react";
import usePostAlarmService from '../service/postAlarm';
import '../style/clock.css';
import ToggleDays from "./toggleDays"
import {Sonnerie} from "../type/Alarm";
import Button from '@mui/material/Button';
import { useGlobalContext } from "../context/appContext";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {selectSx, menuItemSx, paperSx} from '../style/muiStyle'

interface modalProps {
    handleClose:(event: React.MouseEvent<HTMLElement>) => void
  }

const AddAlarm:React.FunctionComponent<modalProps> = ({handleClose}) => {
    const alarmCtx= useGlobalContext();
    const {service, postAlarm} = usePostAlarmService();
    const [sonnerie, setSonnerie] = useState<Sonnerie>("Sonnerie classique");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [disableSave, setDisableSave] = useState<boolean>(true);
    const sentRef = useRef<Boolean>(false);
    const [days, setDays] = useState(["L/D"]);

    // callback for toggleDays component, updates the active days of the alarm
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
    };

    const addAlarm = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(inputRef.current){
            let timeValue = inputRef.current.value
            sentRef.current=true;

            const res = await postAlarm(inputRef.current.value, sonnerie, days);
            let newData = {id: res.alarm_id, time:timeValue, active:true, sonnerie:sonnerie, jours:days} ;
            alarmCtx.setData((prevData)=>[...prevData, newData]);
        }
    }

    // disable save if no time has been defined or if there is already an alarm at this time
    const enableSave = (event:React.ChangeEvent<HTMLInputElement>)=>{
        var result = alarmCtx.data.filter(obj => {
            return obj.time === inputRef.current?.value
          })
        if(inputRef.current && result.length!==0){
            setDisableSave(true)
        } else {
            setDisableSave(false)
        }
    }

    const updateSonnerie = (event:SelectChangeEvent)=>{
        setSonnerie(event.target.value as Sonnerie)
    }

    return <div>
        {!sentRef.current && <div className="flex">
            <input className="newAlarmInput" type="time" onChange={enableSave} ref={inputRef} />
            <ToggleDays handleFn={handleDays} currValue={days} btnStyle={"add"}/>
            <Box>
                <Select
                value={sonnerie}
                MenuProps={{PaperProps:{sx:paperSx}}}
                onChange={updateSonnerie}
                sx={selectSx}>
                    <MenuItem sx={menuItemSx} value={"Sonnerie classique"}>Sonnerie classique</MenuItem>
                    <MenuItem sx={menuItemSx} value={"Sonnerie FM"}>Sonnerie FM</MenuItem>
                </Select>
            </Box>
            {disableSave && <div className="disableSave">Vous devez choisir une heure qui n'a pas déjà été choisie.</div>}
            <button className="newAlarmInput saveBtn" disabled={disableSave} onClick={addAlarm}>Enregistrer</button>
        </div>
        } 
        {service.status === 'loading' && <div  className="postSend">En cours d'envoi...</div>}
        {service.status === 'loaded' && <div  className="postSend">Alarme crée</div>}
        {service.status === 'error' && <div  className="postSend">Erreur</div>}
        {sentRef.current && <div className="postSend"> <Button sx={{color:"red", textAlign:"center"}} onClick={handleClose}>Fermer</Button></div>
}

    </div>
}

export default AddAlarm;