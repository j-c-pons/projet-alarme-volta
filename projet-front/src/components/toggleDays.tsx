import {ToggleButton, ToggleButtonGroup } from '@mui/material';
import {btnSx} from '../style/form'
import {DAYS} from '../utils/functions'

interface ToggleDaysProps {
    handleFn:(event: React.MouseEvent<HTMLElement>, newDay: string) =>void, 
    currValue:string[]
}

const ToggleDays:React.FunctionComponent<ToggleDaysProps> = ({handleFn, currValue}) =>{ 

  return (
        <ToggleButtonGroup
            sx={btnSx}
            value={currValue}
            exclusive
            onChange={handleFn}
            aria-label="text alignment"
        >
            {DAYS.map((day, index) => (
                <ToggleButton  key={day.key} value={day.label} aria-label={day.key} >
                    {day.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>

  );
}

export default ToggleDays;
