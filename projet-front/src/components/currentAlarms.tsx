
import React, { useState, useEffect} from "react";
import {useGlobalContext} from '../context/appContext';
import useGetAlarmsService from '../service/getAlarms';
import AlarmItm from './alarmItm';
// import usePostAlarmService from '../service/postAlarm';
import '../style/clock.css';
import HasAlarmModal from "./modals/hasAlarmModal";
import LoadAlarmModal from "./modals/loadAlarmModal";

const CurrentAlarms: React.FunctionComponent = () => {
    const {result, setResult} = useGetAlarmsService();
    // const {service, postAlarm} = usePostAlarmService();
    const alarmCtx= useGlobalContext();
    const [chromeCheck, setChromeCheck] = useState(true);
    const [displayAlarm, setDisplayAlarm] = useState(false);

    // useEffect(() => {
    //   // new time out (5 min) in case an alarm is snoozed
    //   let sonnerieToSnooze = alarmCtx.pauseAlarm();
    //   // setHasAlarm(false); 
    //   // console.log("test11111", alarmCtx.hasAlarm)
    //   const timer = setTimeout(() => {
    //     // console.log("start", alarmCtx.hasAlarm) 
    //     alarmCtx.startAlarm(sonnerieToSnooze);
    //   }, 9000);
    //   // }, 300000); 

    //     return () => {
    //       clearTimeout(timer);
    //     };

    // }, [alarmCtx.snooze]);

    
  //   useEffect(() => {
  //     console.log("test22222222222222222", alarmCtx.hasAlarm)
  //  },[alarmCtx.hasAlarm])

    const removeAlarm = (id:number)=>{ 
      alarmCtx.setData((prevData) =>
        prevData.filter((data) => data.id !== id) 
      );
    }

    const snoozeAlarm = (e:React.MouseEvent<HTMLElement>) => {
      // alarmCtx.setSnooze((prev)=>{ return !prev})
      // alarmCtx.snoozeAlarm(); 
      alarmCtx.setHasAlarm(false);

      let sonnerieToSnooze = alarmCtx.pauseAlarm();
      // setHasAlarm(false); 
      const timer = setTimeout(() => {
        console.log("start22222222", alarmCtx.hasAlarm) 
        alarmCtx.startAlarm(sonnerieToSnooze);
      }, 9000);
  
      // }, 300000); 
    };

    const updateResult=(res:boolean) => {
      if(res){
        setResult({ status: 'loaded' });
      } else {
        setChromeCheck(false)
        setResult({ status: 'loaded' });
      }
    }

    return <div className="text">
      {alarmCtx.data.length<1 &&(<h3>Aucune alarme sauvegardée</h3>)}
      {result.status === 'loading' && <div>Loading...</div>}
      {result.status === 'chromeCheck' && <LoadAlarmModal openModal={true} callback={updateResult}/>}
      {result.status === 'loaded' && alarmCtx.data &&
        alarmCtx.data.map(alarm=>
          <AlarmItm key={alarm.id} item={alarm} removeAlarm={removeAlarm} chromeCheck={chromeCheck} />
        )
      }
      {result.status === 'error' && (<div>Error, something went wrong.</div>)}
      {alarmCtx.hasAlarm && <HasAlarmModal snooze={snoozeAlarm}/>}
    </div>
}

export default CurrentAlarms;