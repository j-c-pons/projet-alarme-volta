
import React, { useState, useRef } from "react";
import usePostAlarmService from '../service/postAlarm';
import '../style/clock.css';
import ToggleButtons from "./toggleDays"
import {postAlarm} from "../type/Alarm";
import Button from '@mui/material/Button';
import { useGlobalContext } from "../context/appContext";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {selectSx, menuItemSx, paperSx} from '../style/form'

interface modalProps {
    handleClose:(event: React.MouseEvent<HTMLElement>) => void
  }
  
const AddAlarm:React.FunctionComponent<modalProps> = ({handleClose}) => {
    const alarmCtx= useGlobalContext();
    const {service, postAlarm} = usePostAlarmService();
    const [sonnerie, setSonnerie] = useState<string>("Sonnerie classique");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [timeNull, setTimeNull] = useState<boolean>(true);
    const sentRef = useRef<Boolean>(false);

    const addAlarm = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(inputRef.current!=null){
            let timeValue = inputRef.current.value
            sentRef.current=true;
            const res = await postAlarm(inputRef.current.value, sonnerie, alarmCtx.days);
            let newData = {id: res.alarm_id, time:timeValue, active:true, sonnerie:sonnerie, jours:alarmCtx.days} ;
            alarmCtx.setData((prevData)=>[...prevData, newData]);
        }
    }

    const updateTimeNull = (event:React.ChangeEvent<HTMLInputElement>)=>{
        if(inputRef.current!=null)
            setTimeNull(false)
    }

    const updateSonnerie = (event:SelectChangeEvent)=>{
        setSonnerie(event.target.value as string)
    }

    return <div>
        {!sentRef.current &&
            <div className="addAlarm">
            <input className="newAlarmInput" type="time" onChange={updateTimeNull} ref={inputRef} />
            <ToggleButtons />
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
            <button className="newAlarmInput saveBtn" disabled={timeNull} onClick={addAlarm}>Enregistrer</button>
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