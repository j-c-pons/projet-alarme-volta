import React, { useContext, useState, useRef, useMemo, useEffect } from "react";
import Modal from '@mui/material/Modal';
import {modalSx2, modalSx} from '../../style/form'
import Box from '@mui/material/Box';
import { FcAlarmClock } from "react-icons/fc";
import {useGlobalContext} from '../../context/appContext';
import '../../style/clock.css';
import Button from '@mui/material/Button';
import {createPortal} from 'react-dom'; 

interface loadAlarmProps {
  openModal:boolean
  callback:(res:boolean)=>void
}
 
const LoadAlarmModal: React.FunctionComponent<loadAlarmProps> = ({openModal, callback}) => {
    const alarmCtx= useGlobalContext();
    const [open, setOpen] = useState(true);
    // console.log("try")
    // const [alarmAudio, setAlarmAudio]  = useState(new Audio(ring))

    // useEffect(() => {
    // }, []);

    // const handleOpen = () => setOpen(true);

    // const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    //     setOpen(false);
    // };

    const handleYes = (event: React.MouseEvent<HTMLElement>) => {
      callback(true);
      setOpen(false);
    };
    const handleNo = (event: React.MouseEvent<HTMLElement>) => {
      callback(false);
      setOpen(false);
    };

    return createPortal( 
      <Modal  
        open={openModal}
        onClose={handleNo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalSx}>
            <div>Voulez-vous activer les alarmes enregistrées ?</div>
            <Button sx={{color:"red", textAlign:"center"}} onClick={handleYes}>Oui</Button>
            <Button sx={{color:"red", textAlign:"center"}} onClick={handleNo}>Non</Button>
        </Box>
      </Modal>
    , document.body)
}

export default LoadAlarmModal

