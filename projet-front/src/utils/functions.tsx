
import {allTZ} from '../type/Alarm'

//24h in ms
const OneDaytoMS = 86400000

// Tableaux pour les jours de la semaine et les mois
let joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
let mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const DAYS = [
    {
      key: "Dimanche",
      label: "D"
    },
    {
      key: "Lundi",
      label: "L"
    },
    {
      key: "Mardi",
      label: "Ma"
    },
    {
      key: "Mercredi",
      label: "Me"
    },
    {
      key: "Jeudi",
      label: "J"
    },
    {
      key: "Vendredi",
      label: "V"
    },
    {
      key: "Samedi",
      label: "S"
    },
    {
      key:"Lundi-Dimanche",
      label:"L/D"
    },
    {
      key:"Lundi-Vendredi",
      label:"L/V"
    }
  ];

// check if the alarm is set for today, if so return true, else false
function filterDayOfAlarm(input:string[]):Boolean {
    let date = new Date();
    const dayOfTheWeek = joursSemaine[date.getDay()];
    if(input[0]==="L/D"){
        return true;
    } else if(input[0]==="L/V"){
        if(dayOfTheWeek==="Samedi" || dayOfTheWeek==="Dimanche"){
            return false;
        } else {
            return true;
        }
    } else if(input.indexOf(DAYS[date.getDay()].label)===-1){
        return false;
    } else {
        return true;
    }
}

// calculate time remaining between now and alarm start in ms
function getTimeDiff(alarmTime:string, timezone:string):number {

  // Récupérer l'heure de la tz choisie
  let currentDate = new Date();
  let convertedDate = currentDate.toLocaleTimeString([], {timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit'});
  const [h, m, s] = convertedDate.split(":");

  // Récupérer l'heure de l'alarme
  const alarmDate = new Date();
  const [heure2Str, minute2Str] = alarmTime.split(":");

  alarmDate.setHours(parseInt(heure2Str), parseInt(minute2Str), 0);
  currentDate.setHours(parseInt(h), parseInt(m), parseInt(s));

  // Calculer la différence en millisecondes
  let differenceMs = alarmDate.getTime() - currentDate.getTime();

  if(differenceMs<0){
    // l'alarme se déclanchera le lendemain
    differenceMs = alarmDate.getTime() - currentDate.getTime()+OneDaytoMS;
  }

  return differenceMs;
}

export {DAYS, filterDayOfAlarm , getTimeDiff, joursSemaine, mois}