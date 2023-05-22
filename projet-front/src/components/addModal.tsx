import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import '../style/clock.css';
import AddAlarm from './addAlarm';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderColor:'red',
  boxShadow: 24,
  p: 4,
  background:"black",
  color:"red"
}

const AddItemModal: React.FunctionComponent = ({}) => {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event: React.MouseEvent<HTMLElement>) => setOpen(false);

  return (
    <div>
      <Button sx={{color:"black !important", backgroundColor:"red", borderRadius:1,    "&:hover":{
        background:"#ff000095",
    },}} onClick={handleOpen}>Nouvelle alarme</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <AddAlarm handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}

export default AddItemModal;