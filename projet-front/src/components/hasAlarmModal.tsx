import React, { useContext, useState, useRef } from "react";
import Modal from '@mui/material/Modal';
import {modalSx} from '../style/form'
import Box from '@mui/material/Box';
import { FcAlarmClock } from "react-icons/fc";
import {useGlobalContext} from '../context/appContext';
import '../style/clock.css';

const HasAlarmModal: React.FunctionComponent = () => {
    const alarmCtx= useGlobalContext();
    const [open, setOpen] = React.useState(false);
    const handleClose = (event: React.MouseEvent<HTMLElement>) => setOpen(false);

    return <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalSx}>
            <FcAlarmClock className={`alarm-icon ${alarmCtx.hasAlarm && 'active'}`} />
        </Box>
      </Modal>
    </div>
}

export default HasAlarmModal
