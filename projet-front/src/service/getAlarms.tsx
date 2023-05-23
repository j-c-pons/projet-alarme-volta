
import { useState, useEffect } from "react";
import {Alarm, Service, ServiceLoaded, Alarms} from "../type/Alarm";
// import useModalShow from "./modal";
// import { confirmable } from 'react-confirm';
import { useGlobalContext } from "../context/appContext";



const useGetAlarmsService = () => {
  const alarmCtx= useGlobalContext();
  const [result, setResult] = useState<Service<ServiceLoaded>>({
    status: 'loading',
  });
  // const [data, setData] = useState<Alarm[]>([]);
  const [chromeCheck, setChromeCheck] = useState(false);

  // console.log("test")
  const urlBack = "http://127.0.0.1:8000/get_alarms";
  useEffect(() => {
    let ignore = false;

    function getAlarms(){
      fetch(urlBack)
      .then(response => response.json())
      .then(response => {
        if (!ignore) {
          if(response.alarms.length>0 && navigator.userAgent.indexOf("Chrome") > -1){
            setChromeCheck(true)
          }

          //if (window.confirm("Do you really want to leave?")) {
          setResult({ status: 'loaded' });
          alarmCtx.setData(response.alarms);
          //}
        }
      })
      .catch(error => setResult({ status: 'error', error }));
    }
    
    getAlarms();
    return () => {
      ignore = true;
    };

  }, []);

  
  return { result, chromeCheck, setChromeCheck};
};


export default useGetAlarmsService;
