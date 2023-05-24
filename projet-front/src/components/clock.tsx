import React,  { useState, useEffect,  Dispatch, SetStateAction } from "react";
import '../style/clock.css';
import {useGlobalContext} from '../context/appContext';

interface ClockProps {
  format: string;
}

 const Clock: React.FunctionComponent<ClockProps> = ({ format }) => {
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
    //toLocaleTimeString([], { timeZone: 'UTC' })
    // const date = time.toLocaleTimeString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: selectedTimezone  });

    // Créer une instance de l'objet Date
      let date = new Date();

    // Tableaux pour les jours de la semaine et les mois
    let joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    let mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    // Obtenir les composants de la date
    let jourSemaine = joursSemaine[date.getDay()];
    let jour = date.getDate();
    let moisActuel = mois[date.getMonth()];
    let annee = date.getFullYear();

    // Construire la chaîne de caractères pour afficher la date
    let dateFormatee = jourSemaine + " " + jour + " " + moisActuel + " " + annee;

  return (
    <div>
      <div className="clock clock_center">{formattedTime}</div>
      <div className="clock__date">
        {dateFormatee}        
      </div>
      <div className="tz">Timezone: {alarmCtx.timezone}</div> 
    </div>
  );
}

export default Clock;