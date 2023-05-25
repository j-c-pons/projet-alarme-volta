import { useState, useEffect, useMemo} from "react";
import {useGlobalContext} from '../context/appContext';
import { joursSemaine, mois } from "../utils/functions";
import '../style/clock.css';

 const Clock: React.FunctionComponent = () => {
    const alarmCtx= useGlobalContext();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }, []);

    // clock HH:MM:SS
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: alarmCtx.timezone  });
    
    // Composants de la date
    const jourSemaine = joursSemaine[time.getDay()];
    const moisActuel = mois[time.getMonth()];
    const jourNum = time.getDate();
    const annee =  time.getFullYear();
    
    // Construire la chaîne de caractères pour afficher la date
    const date = useMemo(()=>{
      return jourSemaine + " " + jourNum + " " + moisActuel + " " + annee;
    }, [jourSemaine, jourNum, moisActuel, annee])

  return (
    <div>
      <div className="clock clock_center">{formattedTime}</div>
      <div className="date">
        {date}        
      </div>
      <div className="tz">Timezone: {alarmCtx.timezone}</div> 
    </div>
  );
}

export default Clock;
