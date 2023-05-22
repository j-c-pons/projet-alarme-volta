
import React, { useState, useRef } from "react";
import usePostAlarmService from '../service/postAlarm';
import '../style/clock.css';
import ToggleButtons from "./toggleDays"
import {postAlarm} from "../type/Alarm";
import useGetAlarmsService from '../service/getAlarms';
import Button from '@mui/material/Button';
import { useGlobalContext } from "../context/appContext";

interface modalProps {
    handleClose:(event: React.MouseEvent<HTMLElement>) => void
  }
  
const AddAlarm:React.FunctionComponent<modalProps> = ({handleClose}) => {
    const alarmCtx= useGlobalContext();
    const {service, postAlarm} = usePostAlarmService();
    const {result, data, setData, chromeCheck} = useGetAlarmsService();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const sentRef = useRef<Boolean>(false);
      const addAlarm = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(inputRef.current!=null){
          const res = await postAlarm(inputRef.current.value);
          let newData = {id: res.alarm_id, time:inputRef.current.value, active:true} ;
          setData((prevData)=>[...prevData, newData]);
          inputRef.current.value="";
          sentRef.current=true;
          console.log("ok")
        }
        //TODO else
        //todo move to another comp
    };

    return <div>
        {!sentRef.current &&
        <div>
        <input className="newAlarmInput" type="time"  ref={inputRef} />
        <ToggleButtons />
        <button className="newAlarmInput saveBtn" onClick={addAlarm}>Enregistrer</button>
        </div>
        } 
        {service.status === 'loading' && <div>En cours d'envoi...</div>}
        {service.status === 'loaded' && <div>Alarme crée</div>}
        {service.status === 'error' && <div>Erreur</div>}
        {sentRef.current && <Button sx={{color:"red"}} onClick={handleClose}>Fermer</Button>}
    </div>
}

export default AddAlarm;