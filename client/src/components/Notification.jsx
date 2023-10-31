import { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Menu, MenuItem } from '@mui/material';
import { NotificationApi } from '../utils/notificationApi';


export default function Notification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [invisible, setInvisible] = useState(true);
  const [notification, setNotification] = useState('');
  const open = Boolean(anchorEl);


  const handleClick = (e) => {
    if (notification) {
      setAnchorEl(e.currentTarget);
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
    setNotification('');
    setInvisible(true);
  }

  useEffect(() => {
    NotificationApi.subscribe({
      onNext,
      onError: err => console.error(err)
    })
  }, []);

  const onNext = (data) => {
    console.log('[PUSH NOTIFICATION]', { data });
    setInvisible(false);

    const message = data?.data?.notification?.message;
    setNotification(message);
  };

  return (
    <>
      <Badge
        color='error'
        variant='dot'
        invisible={invisible}
        overlap='circular'
        sx={{ '&:hover': { cursor: 'pointer' }, ml: '5px' }}
      >
        <NotificationsIcon onClick={handleClick} sx={{ color: '#7D9D9C' }} />
      </Badge>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>{notification}</MenuItem>
      </Menu>
    </>
  )
}
