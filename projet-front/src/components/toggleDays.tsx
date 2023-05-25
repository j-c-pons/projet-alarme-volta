import {ToggleButton, ToggleButtonGroup } from '@mui/material';
import {btnSx, btnSx3} from '../style/muiStyle'
import {DAYS} from '../utils/functions'

interface ToggleDaysProps {
    handleFn:(event: React.MouseEvent<HTMLElement>, newDay: string) =>void, 
    currValue:string[]
    style?:string
}

const ToggleDays:React.FunctionComponent<ToggleDaysProps> = ({handleFn, currValue, style}) =>{ 
    let groupStyle;
    style==="add"? groupStyle = btnSx3 : groupStyle = btnSx;

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
