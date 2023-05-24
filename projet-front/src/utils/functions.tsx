import {Alarm} from "../type/Alarm";

const OneDaytoMS = 86400000
const minutesNumber = fixNumber(Array.from(Array(60).keys()))
const hourNumber = fixNumber(Array.from(Array(13).keys()))

const joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const DAYS = [
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
      key: "Dimanche",
      label: "D"
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

function fixNumber(value:number[]):string[] {
    let res = value.map(hour => {
        if (hour < 10) {
            let test:string = "0" + hour.toString()
            return test
        }
        return hour.toString()
    })
    return res
}

function filterDayOfAlarm(input:Alarm):Boolean {
    let date = new Date();
    // const dayOfTheWeek = joursSemaine[date.getDay()];
    const dayOfTheWeek = DAYS[date.getDay()].key;
    console.log("dayOfTheWeek", dayOfTheWeek)
    if(input.jours[0]==="L/D"){
        return true;
    } else if(input.jours[0]==="L/V"){
        if(dayOfTheWeek==="Samedi" || dayOfTheWeek==="Dimanche"){
            return false;
        } else {
            return true;
        }
    } else if(input.jours.indexOf(dayOfTheWeek)!==-1){
        return true;
    } else {
        return false;
    }
}

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

export { minutesNumber, hourNumber, DAYS, filterDayOfAlarm , getTimeDiff}