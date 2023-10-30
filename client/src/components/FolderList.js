import { Card, CardContent, Typography, List, Box } from '@mui/material';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NewFolder from './NewFolder';

export default function FolderList({ folders = [] }) {
  const { folderId } = useParams();
  const [activeId, setActiveId] = useState(folderId);

  useEffect(() => {
    setActiveId(folderId);
  }, [folderId]);

  return (
    <List
      sx={{ textAlign: 'left', overflowY: 'auto', p: 0 }}
      subheader={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
          <Typography>Folder List</Typography>
          <NewFolder />
        </Box>
      }
    >
      {
        folders.map(({ id, name }) => {
          return (
            <Link
              key={id}
              to={`folders/${id}`}
              style={{ textDecoration: "none" }}
              onClick={() => setActiveId(id)}
            >
              <Card sx={{ mb: "5px", bgcolor: id === activeId ? "rgb(255 211 140)" : "" }}>
                <CardContent sx={{ '&:last-child': { pb: '10px' }, padding: '10px' }}>
                  <Typography sx={{ fontSize: '14px' }}>{name}</Typography>
                </CardContent>
              </Card>
            </Link>
          )
        })
      }
    </List>
  )
}
