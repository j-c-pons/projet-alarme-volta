import React, { useState } from "react";
import Modal from '@mui/material/Modal';
import {modalSx, confirmBtnSx} from '../../style/form'
import Box from '@mui/material/Box';
import { FcAlarmClock } from "react-icons/fc";
import '../../style/clock.css';
import Button from '@mui/material/Button';
import {createPortal} from 'react-dom';

interface pauseAlarmProps {
    snooze:(event: React.MouseEvent<HTMLElement>)=>void
    display:boolean
    stopAlarmFn:() => void
}

const HasAlarmModal: React.FunctionComponent<pauseAlarmProps> = ({snooze, display, stopAlarmFn}) => {
    const [open, setOpen] = useState(true);

    // const handleOpen = () => setOpen(true);

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        stopAlarmFn();
        setOpen(false);
    };

    return createPortal(<div> 
      <Modal  
        open={display}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex" sx={modalSx}>
            <FcAlarmClock className="alarm-icon" />
            <Button sx={confirmBtnSx} onClick={handleClose}>Fermer</Button>
            <Button sx={confirmBtnSx} onClick={snooze}>Répéter (5 minutes)</Button>
        </Box>
      </Modal>
    </div>, document.body)
}

export default HasAlarmModal

