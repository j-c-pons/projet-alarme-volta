export interface Alarm {
    id: number;
    time: string;
    active:boolean | string;
    sonnerie:string;
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
    | ServiceLoaded
    | ServiceError;