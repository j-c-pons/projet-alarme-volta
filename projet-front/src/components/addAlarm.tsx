
import React, { useState, useRef } from "react";
import usePostAlarmService from '../service/postAlarm';

import {postAlarm} from "../type/Alarm";

const AddAlarm:React.FunctionComponent = () => {
    const [time, setTime] = useState('');
    const {service, postAlarm} = usePostAlarmService();
    const inputRef = useRef(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("allo", inputRef)
        if(inputRef.current!=null){
            postAlarm(inputRef.current);
        }

      };

    return <div>
        <div>
            <input type="time" ref={inputRef} />
            <button onClick={handleClick}>Save</button>
            {service.status === 'loading' && <div>Sending...</div>}
            {service.status === 'loaded' && <div>Alarm submitted</div>}
            {service.status === 'error' && <div>Error message</div>}
        </div>
        <div>

        </div>
    </div>
}

export default AddAlarm;