
import React, { useContext, useState, useRef } from "react";
import {useGlobalContext} from '../context/appContext';
import useGetAlarmsService from '../service/getAlarms';
import AlarmItm from './alarmItm';
import usePostAlarmService from '../service/postAlarm';
// import Alarm from "../todeletecomp/alarm";
import '../style/clock.css';
// import ToggleButtons from "./toggleDays"

// import SwalSettings from '../service/swalSettings'

const CurrentAlarms: React.FunctionComponent = () => {
    const {result, chromeCheck} = useGetAlarmsService();
    // const [time, setTime] = useState('');
    const {service, postAlarm} = usePostAlarmService();
    // const [chromeCheck, setChromeCheck] = useState(true);
    // const [test, setTest] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const alarmCtx= useGlobalContext();

    const addAlarm = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(inputRef.current!=null){
          // const res = await postAlarm(inputRef.current.value);
          // let newData = {id: res.alarm_id, time:inputRef.current.value, active:true} ;
          // alarmCtx.setData((prevData)=>[...prevData, newData]);
          inputRef.current.value="";
          console.log("ok")
        }
        //TODO else
        //todo move to another comp
    };

    const removeAlarm = (id:number)=>{
      alarmCtx.setData((prevData) =>
        prevData.filter((data) => data.id !== id)
      );
    }

    return <div className="text">
      {alarmCtx.data.length<1?(
        <h3>Aucune alarme sauvegardée</h3>
      ):(
        <h3>Alarmes sauvegardées:</h3>
      )}
      {result.status === 'loading' && <div>Loading...</div>}
      {result.status === 'loaded' && alarmCtx.data &&
        alarmCtx.data.map(alarm=><AlarmItm key={alarm.id} stat={alarm} removeAlarm={removeAlarm} chromeCheck={chromeCheck}/>)
      }
            {/* {service.status === 'loaded' &&
        service.payload.map(alarm=>(<div key={alarm.id}> {alarm.time} / {alarm.active}</div>))} */}
      {result.status === 'error' && (
        <div>Error, something went wrong.</div>
      )}
    </div>
}

export default CurrentAlarms;