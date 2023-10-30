import React, { useState } from 'react'
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material'
import { NoteAddOutlined } from '@mui/icons-material';
import { addNewFolder } from '../utils/folderApi';

export default function NewFolder() {
  const [isOpen, setIsOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleOnChange = (e) => {
    setNewFolderName(e.target.value);
  }

  const handleAddNewFolder = async () => {
    const addFolder = await addNewFolder({ name: newFolderName });
    console.log({ addFolder }, "ADD FOLDER")
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Tooltip title='Add Folder' onClick={() => setIsOpen(true)}>
        <IconButton size='small'>
          <NoteAddOutlined />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Folder Name'
            fullWidth
            size='small'
            variant='standard'
            sx={{ width: '400px' }}
            autoComplete='off'
            value={newFolderName}
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
