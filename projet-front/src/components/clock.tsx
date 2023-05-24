import React,  { useState, useEffect } from "react";
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

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: alarmCtx.timezone  });

    // Créer une instance de l'objet Date
    let date = new Date();


    // Obtenir les composants de la date
    let jourSemaine = joursSemaine[date.getDay()];
    let jourNum = date.getDate();
    let moisActuel = mois[date.getMonth()];
    let annee = date.getFullYear();

    // Construire la chaîne de caractères pour afficher la date
    let dateFormatee = jourSemaine + " " + jourNum + " " + moisActuel + " " + annee;

  return (
    <div>
      <div className="clock clock_center">{formattedTime}</div>
      <div className="date">
        {dateFormatee}        
      </div>
      <div className="tz">Timezone: {alarmCtx.timezone}</div> 
    </div>
  );
}

export default Clock;