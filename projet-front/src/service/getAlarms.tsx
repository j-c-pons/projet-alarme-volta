
import { useState, useEffect } from "react";
import {Service, ServiceLoaded, Alarm} from "../type/Alarm";
import { useGlobalContext } from "../context/appContext";

const useGetAlarmsService = () => {
  const alarmCtx= useGlobalContext();
  const [result, setResult] = useState<Service<ServiceLoaded>>({
    status: 'loading',
  });

  const urlBack = process.env.REACT_APP_URL_BACK+"get_alarms";

  useEffect(() => {
    let ignore = false;
    function getAlarms(){
      fetch(urlBack)
      .then(response => response.json())
      .then(response => {
        if (!ignore) {
          if(response.alarms.length>0 && navigator.userAgent.indexOf("Chrome") > -1){
            setResult({ status: 'chromeCheck' });
            response.alarms.forEach((itm:Alarm)=>{itm.active=false})
          } else {
            setResult({ status: 'loaded' });
          }
          alarmCtx.setData(response.alarms);
        }
      })
      .catch(error => setResult({ status: 'error', error }));
    }
    
    getAlarms();
    return () => {
      ignore = true;
    };

  }, []);

  
  return { result, setResult}; 
};


export default useGetAlarmsService;
