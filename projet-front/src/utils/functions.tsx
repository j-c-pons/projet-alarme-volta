import {Alarm} from "../type/Alarm";

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
    } else if(input.jours.indexOf(dayOfTheWeek)!=-1){
        return true;
    } else {
        return false;
    }
}

// var arrByID = arr.filter(filtrerParID);

export { minutesNumber, hourNumber, filterDayOfAlarm }