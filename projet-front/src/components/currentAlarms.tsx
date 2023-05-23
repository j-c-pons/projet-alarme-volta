
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
    const alarmCtx= useGlobalContext();

    const removeAlarm = (id:number)=>{ 
      alarmCtx.setData((prevData) =>
        prevData.filter((data) => data.id !== id)
      );
    }

    return <div className="text">
      {alarmCtx.data.length<1 &&(<h3>Aucune alarme sauvegardée</h3>)}
      {result.status === 'loading' && <div>Loading...</div>}
      {result.status === 'loaded' && alarmCtx.data &&
        alarmCtx.data.map(alarm=><AlarmItm key={alarm.id} item={alarm} removeAlarm={removeAlarm} chromeCheck={chromeCheck}/>)
      }
            {/* {service.status === 'loaded' &&
        service.payload.map(alarm=>(<div key={alarm.id}> {alarm.time} / {alarm.active}</div>))} */}
      {result.status === 'error' && (
        <div>Error, something went wrong.</div>
      )}
    </div>
}

export default CurrentAlarms;