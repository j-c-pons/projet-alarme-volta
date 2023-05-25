import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {selectSx, menuItemSx, paperSx} from '../style/muiStyle'
import { useGlobalContext } from "../context/appContext";
import { useTimezoneSelect, allTimezones } from 'react-timezone-select'

const labelStyle = 'original'
const timezones = {
  ...allTimezones,
  'Europe/Berlin': 'Frankfurt'
}
const SelectTimezone: React.FunctionComponent = () => {
  const alarmCtx= useGlobalContext();
  const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timezones })

  const handleChange = (event: SelectChangeEvent) => {
    alarmCtx.setTimezone(event.target.value as string);
  };

  return (
    <Box>
        <Select
          value={alarmCtx.timezone}
          onChange={handleChange}
          MenuProps={{PaperProps:{sx:paperSx}}}
          sx={selectSx}>

          {options.map((option, idx) => (
            <MenuItem sx={menuItemSx} key={idx} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
    </Box>
  );
}

export default SelectTimezone;






