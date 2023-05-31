
import { useState, useEffect } from "react";
import {Service, ServiceLoaded} from "../type/Alarm";
import { useGlobalContext } from "../context/appContext";

const useGetAlarmsService = () => {
  const alarmCtx= useGlobalContext();
  const [result, setResult] = useState<Service<ServiceLoaded>>({
    status: 'loading',
  });
  const urlGet = "http://127.0.0.1:8000/get_alarms";

  useEffect(() => {
    let ignore = false;
    function getAlarms(){
      fetch(urlGet)
      .then(response => response.json())
      .then(response => {
        if (!ignore) {
          if(response.alarms.length>0 && navigator.userAgent.indexOf("Chrome") > -1){
            setResult({ status: 'chromeCheck' });
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
