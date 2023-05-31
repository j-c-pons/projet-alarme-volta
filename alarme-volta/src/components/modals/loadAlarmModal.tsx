import React from "react";
import Modal from '@mui/material/Modal';
import {modalSx, confirmBtnSx} from '../../style/muiStyle'
import Box from '@mui/material/Box';
import {useGlobalContext} from '../../context/appContext';
import '../../style/clock.css';
import Button from '@mui/material/Button';
import {createPortal} from 'react-dom'; 

interface loadAlarmProps {
  openModal:boolean
  callback:()=>void
}
 
const LoadAlarmModal: React.FunctionComponent<loadAlarmProps> = ({openModal, callback}) => {
    const alarmCtx= useGlobalContext();

    const handleYes = (event: React.MouseEvent<HTMLElement>) => {
      callback();
      alarmCtx.setData((prev)=>{
        let dataToLoop = prev;
        dataToLoop.forEach((itm)=>{itm.active=false})
        return dataToLoop;
      })
    };

    const handleNo = (event: React.MouseEvent<HTMLElement>) => {
      callback();
    };

    return createPortal( 
      <Modal  
        open={openModal}
        onClose={handleNo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex" sx={modalSx}>
            <div className="modalTxt">Voulez-vous désactiver les alarmes précédemment enregistrées ?</div>
            <div>
              <Button sx={confirmBtnSx} onClick={handleYes}>Oui</Button>
              <Button sx={confirmBtnSx} onClick={handleNo}>Non</Button>
            </div>
        </Box>
      </Modal>
    , document.body)
}

export default LoadAlarmModal

