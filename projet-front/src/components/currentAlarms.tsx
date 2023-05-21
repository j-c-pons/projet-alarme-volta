
import React, { useContext, useState, useRef } from "react";
import {useGlobalContext} from '../context/appContext';
import useGetAlarmsService from '../service/getAlarms';
import AlarmItm from './alarmItm';
import usePostAlarmService from '../service/postAlarm';
import Alarm from "../todeletecomp/alarm";

// import SwalSettings from '../service/swalSettings'

const CurrentAlarms: React.FunctionComponent = () => {
    const {result, data, setData, chromeCheck} = useGetAlarmsService();
    const [time, setTime] = useState('');
    const {service, postAlarm} = usePostAlarmService();
    // const [chromeCheck, setChromeCheck] = useState(true);
    const [test, setTest] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);


    const addAlarm = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(inputRef.current!=null){
          const res = await postAlarm(inputRef.current.value);
          let newData = {id: res.alarm_id, time:inputRef.current.value, active:true} ;
          setData((prevData)=>[...prevData, newData]);
        }
        //TODO else
        //todo move to another comp
    };

    const removeAlarm = (id:number)=>{
      setData((prevData) =>
        prevData.filter((data) => data.id !== id)
      );
    }

    return <div>
      <div>
            <input type="time"  ref={inputRef} />
            <button onClick={addAlarm}>Save</button>
            {service.status === 'loading' && <div>Sending...</div>}
            {service.status === 'loaded' && <div>Alarm submitted</div>}
            {service.status === 'error' && <div>Error message</div>}
      </div>
      <div>Current Alarms:</div>
      {result.status === 'loading' && <div>Loading...</div>}
      {result.status === 'loaded' && data &&
        data.map(alarm=><AlarmItm key={alarm.id} stat={alarm} removeAlarm={removeAlarm} chromeCheck={chromeCheck}/>)
      }
            {/* {service.status === 'loaded' &&
        service.payload.map(alarm=>(<div key={alarm.id}> {alarm.time} / {alarm.active}</div>))} */}
      {result.status === 'error' && (
        <div>Error, something went wrong.</div>
      )}
    </div>
}

export default CurrentAlarms;