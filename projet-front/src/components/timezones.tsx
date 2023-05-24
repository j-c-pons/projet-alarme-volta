import * as React from 'react';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {selectSx, menuItemSx, paperSx, allTimezones} from '../style/form'
import { useGlobalContext } from "../context/appContext";

const SelectTimezone: React.FunctionComponent = () => {
  const alarmCtx= useGlobalContext();

  // const [timezone, setTimezone] = React.useState("Europe/Brussels");

  const handleChange = (event: SelectChangeEvent) => {
    alarmCtx.setTimezone(event.target.value as string);
  };

  return (
    <Box height={50} marginTop={1}>
        {/* <InputLabel id="demo-simple-select-label">Timezones</InputLabel> */}
        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          value={alarmCtx.timezone}
          // label="Timezone"
          onChange={handleChange}
          MenuProps={{PaperProps:{sx:paperSx}}}
          sx={selectSx}>

          {Object.keys(allTimezones).map((key, idx) => (
            <MenuItem sx={menuItemSx} key={idx} value={key}>
                {allTimezones[key]}
            </MenuItem>
          ))}
        </Select>
    </Box>
  );
}

export default SelectTimezone;






