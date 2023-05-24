import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import '../../style/clock.css';
import AddAlarm from '../addAlarm';
import {modalSx, btnSx2} from '../../style/form'

const AddItemModal: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event: React.MouseEvent<HTMLElement>) => setOpen(false);

  return (
    <div>
      <Button sx={btnSx2} 
      onClick={handleOpen}>
        Nouvelle alarme
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalSx}>
            <AddAlarm handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}

export default AddItemModal;