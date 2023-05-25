import {ToggleButton, ToggleButtonGroup } from '@mui/material';
import {btnSx, btnSx3} from '../style/muiStyle'
import {DAYS} from '../utils/functions'

interface ToggleDaysProps {
    handleFn:(event: React.MouseEvent<HTMLElement>, newDay: string) =>void, 
    currValue:string[]
    btnStyle?:string
}

const ToggleDays:React.FunctionComponent<ToggleDaysProps> = ({handleFn, currValue, btnStyle}) =>{ 
    // Select the style to apply to the component (btnSx3 for addAlarm btns and btnSx for alarmItm btns)
    let groupStyle;
    btnStyle==="add"? groupStyle = btnSx3 : groupStyle = btnSx;

    return (
        <ToggleButtonGroup
            sx={groupStyle}
            value={currValue}
            exclusive
            onChange={handleFn}
            aria-label="text alignment"
        >
            {DAYS.map((day) => (
                <ToggleButton  key={day.key} value={day.label} aria-label={day.key} >
                    {day.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
  );
}

export default ToggleDays;
