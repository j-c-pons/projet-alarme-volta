import React,  { useState, useEffect,  Dispatch, SetStateAction } from "react";
// import "./DigitalClock.css";
import '../style/clock.css';

import {useGlobalContext} from '../context/appContext';

interface ClockProps {
  format: string;
  selectedTimezone:string;
}

 const Clock: React.FunctionComponent<ClockProps> = ({ format, selectedTimezone }) => {
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

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: selectedTimezone  });
  //toLocaleTimeString([], { timeZone: 'UTC' })
  // const date = time.toLocaleTimeString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: selectedTimezone  });

  // Créer une instance de l'objet Date
var date = new Date();

// Tableaux pour les jours de la semaine et les mois
var joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

// Obtenir les composants de la date
var jourSemaine = joursSemaine[date.getDay()];
var jour = date.getDate();
var moisActuel = mois[date.getMonth()];
var annee = date.getFullYear();

// Construire la chaîne de caractères pour afficher la date
var dateFormatee = jourSemaine + " " + jour + " " + moisActuel + " " + annee;

  return (
    <div>
      {/* <div className="clock__text">
        <div className="clock__text-hour">{`${alarmCtx?.hourDigital}:`}</div>
        <div className="clock__text-minutes">{alarmCtx?.minutesDigital}</div>
        <div className="clock__text-ampm">{alarmCtx?.amPm}</div>
      </div> */}
      <div className="clock clock_center">{formattedTime}</div>
      <div className="clock__date">
        {dateFormatee}
        {/* <span>{date2}</span> */}

        {/* <span>{`${alarmCtx?.dayNow} `}</span>
        <span>{`${alarmCtx?.monthNow} `}</span>
        <span>{alarmCtx?.yearNow}</span> */}
        
      </div>
      <div className="tz">Timezone: {selectedTimezone}</div>
    </div>
  );
}

export default Clock;