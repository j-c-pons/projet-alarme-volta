
import React, { useState, useEffect} from "react";
import {useGlobalContext} from '../context/appContext';
import useGetAlarmsService from '../service/getAlarms';
import AlarmItm from './alarmItm';
import '../style/clock.css';
import HasAlarmModal from "./modals/hasAlarmModal";
import LoadAlarmModal from "./modals/loadAlarmModal";

let ring1 = new Audio("https://bigsoundbank.com/UPLOAD/mp3/0173.mp3");
let ring2 = new Audio("http://icecast.radiofrance.fr/fip-midfi.mp3");

const CurrentAlarms: React.FunctionComponent = () => {
    const {result, setResult} = useGetAlarmsService();
    const alarmCtx= useGlobalContext();
    const [chromeCheck, setChromeCheck] = useState(true);
    const [displayAlarm, setDisplayAlarm] = useState(false);
    const [snooze, setSnooze] = useState(false);
    const [sonnerieToSnooze, setSonnerieToSnooze] = useState("");
    const [snoozeTrigger, setSnoozeTrigger] = useState(false);

    useEffect(() => {
      if(snooze){
        // new time out (5 min) in case an alarm is snoozed
        const timer = setTimeout(() => {
          startAlarm(sonnerieToSnooze);
        }, 300000); 

        setSnooze(false)
      }
    }, [snoozeTrigger]);

    const removeAlarm = (id:number)=>{ 
      alarmCtx.setData((prevData) =>
        prevData.filter((data) => data.id !== id) 
      );
    }

    // display alarms after chromecheck on load
    const updateResult=(res:boolean) => {
      if(res){
        setResult({ status: 'loaded' });
      } else {
        setChromeCheck(false)
        setResult({ status: 'loaded' });
      }
    }

    const startAlarm = (sonnerie:string) => {  
      if(!displayAlarm){
        if(sonnerie==="Sonnerie classique"){
          ring1.play();
          ring1.loop = true;
        } else if (sonnerie==="Sonnerie FM"){
          ring2.play();
        }
        setDisplayAlarm(true)
      }
    }
  
    const stopAlarm = () => {
      setDisplayAlarm(false);
      if(!ring1.paused){
        ring1.pause();
        ring1.currentTime=0;
        ring1.loop = false;
        return "Sonnerie classique";
      } else{
        ring2.pause();
        return "Sonnerie FM";
      } 
    };

    const snoozeAlarm = (e:React.MouseEvent<HTMLElement>) => {
      setSonnerieToSnooze(stopAlarm());
      setSnooze(true);
      setSnoozeTrigger((prev)=>{ return !prev})
    };

    return <div className="alarmBox">
      {alarmCtx.data.length<1 &&(<h3>Aucune alarme sauvegardée</h3>)}
      {result.status === 'loading' && <div>Loading...</div>}
      {result.status === 'chromeCheck' && <LoadAlarmModal openModal={true} callback={updateResult}/>}
      {result.status === 'loaded' && alarmCtx.data &&
        alarmCtx.data.map(alarm=>
          <AlarmItm key={alarm.id} item={alarm} removeAlarm={removeAlarm} chromeCheck={chromeCheck} startAlarmFn={startAlarm}/>
        )
      }
      {result.status === 'error' && (<div>Error, something went wrong.</div>)}
      {displayAlarm && <HasAlarmModal snooze={snoozeAlarm} display={displayAlarm} stopAlarmFn={stopAlarm}/>}
    </div>
}

export default CurrentAlarms;