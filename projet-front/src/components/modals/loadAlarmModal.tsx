import React, {useState} from "react";
import Modal from '@mui/material/Modal';
import {modalSx, confirmBtnSx} from '../../style/form'
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
        <Box className="flex" sx={modalSx}>
            <div className="modalTxt">Voulez-vous activer les alarmes enregistrées ?</div>
            <Button sx={confirmBtnSx} onClick={handleYes}>Oui</Button>
            <Button sx={confirmBtnSx} onClick={handleNo}>Non</Button>
        </Box>
      </Modal>
    , document.body)
}

export default LoadAlarmModal

