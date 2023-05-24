import React, { useContext, useState, useRef, useMemo, useEffect } from "react";
import Modal from '@mui/material/Modal';
import {modalSx2, modalSx} from '../../style/form'
import Box from '@mui/material/Box';
import { FcAlarmClock } from "react-icons/fc";
import {useGlobalContext} from '../../context/appContext';
import '../../style/clock.css';
import Button from '@mui/material/Button';
import {createPortal} from 'react-dom';

interface pauseAlarmProps {
    // stopAlarm:() => void
    snooze:(event: React.MouseEvent<HTMLElement>)=>void
}

const HasAlarmModal: React.FunctionComponent<pauseAlarmProps> = ({snooze}) => {
    const alarmCtx= useGlobalContext();

    const [open, setOpen] = useState(true);
    // console.log("try")
    // const [alarmAudio, setAlarmAudio]  = useState(new Audio(ring))

    // useEffect(() => {
    //     console.log("render modal")

    //     let ignore = false;
    //     if(!ignore){
    //         // alarmAudio.play();
    //         // alarmAudio.loop = true;
    //     }

    //     return () => {
    //         ignore = true;
    //     };
    // }, []);

    // const handleOpen = () => setOpen(true);

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        // stopAlarm();
        alarmCtx.setHasAlarm(false);

        alarmCtx.pauseAlarm();  
        // alarmAudio.pause();
        // alarmAudio.currentTime=0;
        setOpen(false);
    };

    // const snooze = (event: React.MouseEvent<HTMLElement>) => {
    //     // alarmCtx.snoozeAlarm(); 
    //     let sonnerie = alarmCtx.pauseAlarm()
    //     // setHasAlarm(false); 
    //     console.log("test11111", alarmCtx.hasAlarm)
    //     const timer = setTimeout(() => {
    //       console.log("start", alarmCtx.hasAlarm) 
    //       alarmCtx.startAlarm(sonnerie);
    //     }, 9000);
    
    //     // }, 300000); 
    //   };

    return createPortal(<div> 
      <Modal  
        open={alarmCtx.hasAlarm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalSx}>
            <FcAlarmClock className="alarm-icon" />
            <Button sx={{color:"red", textAlign:"center"}} onClick={handleClose}>Fermer</Button>
            <Button sx={{color:"red", textAlign:"center"}} onClick={snooze}>Répéter (5 minutes)</Button>
        </Box>
      </Modal>
    </div>, document.body)
}

export default HasAlarmModal

