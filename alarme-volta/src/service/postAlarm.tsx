import { useState } from 'react';
import {postAlarm, Sonnerie, Service} from "../type/Alarm";

const usePostAlarmService = () => {
  const [service, setService] = useState<Service<postAlarm>>({
    status: 'init'
  });

  const postAlarm = async (time: string, sonnerie:Sonnerie, jours:string[]):Promise<{alarm_id:number}>  => {
    setService({ status: 'loading' });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
 
    let json= JSON.stringify({ time: time, sonnerie:sonnerie, jours:jours})

    return new Promise((resolve, reject) => {
    const urlPost = "http://127.0.0.1:8000/create_alarm";

      fetch(urlPost, {
        method: 'POST',
        body:json,
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