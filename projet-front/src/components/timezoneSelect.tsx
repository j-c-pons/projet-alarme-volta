// import "./AnalogClock.css";
// import { FcAlarmClock } from "react-icons/fc";
// import { AlarmContext } from "../context/ContextAlarm";
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import TimezoneSelect from 'react-timezone-select'

type ITimezoneOption = {
    value: string;
    label: string;
    abbrev?: string;
    altName?: string;
    offset?: number;
};

interface tzProps {
    updateTZ:(newTz: string) => void
}

const TimeZone: React.FunctionComponent<tzProps> = ({updateTZ}) => {

    
      const [selectedTimezone, setSelectedTimezone] =useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
      
      )
      
      const handleChange = (out:ITimezoneOption)=>{
        //console.log(value)
        updateTZ(out.value)
        setSelectedTimezone(out.value)
      }

      return (
        <div className="App">
          {/* <h2>react-timezone-select</h2> */}
          {/* <blockquote>Please make a selection</blockquote> */}
          <div className="select-wrapper">
            <TimezoneSelect
              value={selectedTimezone}
              onChange={handleChange}
            />
          </div>
          {/* <h3>Output:</h3> */}
          {/* <div
            style={{
              backgroundColor: '#ccc',
              padding: '20px',
              margin: '20px auto',
              borderRadius: '5px',
              maxWidth: '600px',
            }}
          >
            <pre
              style={{
                margin: '0 20px',
                fontWeight: 500,
                fontFamily: 'monospace',
              }}
            >
              {JSON.stringify(selectedTimezone, null, 2)}
            </pre>
          </div> */}
        </div>
      )
    }
    

export default TimeZone;
