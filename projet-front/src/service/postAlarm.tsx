import { useState } from 'react';
import {postAlarm, Service} from "../type/Alarm";


const usePostAlarmService = () => {
  const [service, setService] = useState<Service<postAlarm>>({
    status: 'init'
  });

  const postAlarm = async (time: string):Promise<{alarm_id:number}>  => {
    setService({ status: 'loading' });

    const headers = new Headers();
    //headers.append('Content-Type', 'application/json; charset=utf-8');
     headers.append("Content-Type", "application/x-www-form-urlencoded");
     var urlencoded = new URLSearchParams();
     urlencoded.append("time", time);
    return new Promise((resolve, reject) => {
    const urlPost = "http://127.0.0.1:8000/create_alarm";

      fetch(urlPost, {
        method: 'POST',
        body: urlencoded,
        headers
      })
        .then(response => response.json())
        .then(response => {
          setService({ status: 'loaded', res: response.alarm_id });
          resolve(response);
          return service
        })
        .catch(error => {
          setService({ status: 'error', error });
          reject(error);
        });
    });
  };

  return {
    service,
    postAlarm
  };
};

export default usePostAlarmService;