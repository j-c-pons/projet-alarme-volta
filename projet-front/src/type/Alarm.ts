export type Sonnerie = "Sonnerie classique" | "Sonnerie FM" ;

export interface Alarm {
    id: number;
    time: string;
    active:boolean | string;
    sonnerie:Sonnerie ;
    jours:string[];
}

export interface Alarms {
  results: Alarm[];
}
export interface postAlarm {
    alarm_id: number;
}

interface ServiceInit {
  status: 'init';
}

interface ServiceLoading {
    status: 'loading';
}

interface ServiceChromeCheck {
  status: 'chromeCheck';
}

export interface ServiceLoaded {
    status: 'loaded';
    payload?: Alarm[];
    res?:number;
}

interface ServiceError {
  status: 'error';
  error: Error;
}

export type Service<T> =
  | ServiceInit
  | ServiceLoading
  |ServiceChromeCheck
  | ServiceLoaded
  | ServiceError;

  export interface allTZ {
    [key: string]: string;
}