import { Card, CardContent, Typography, List, Grid, Box, Tooltip, IconButton } from '@mui/material'
import { NoteAddOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLoaderData, useNavigate, useParams, useSubmit } from 'react-router-dom'
import moment from 'moment';

export default function NoteList() {
  const { folder: { notes } } = useLoaderData();
  const { folderId, noteId } = useParams();

  const [activeId, setActiveId] = useState(noteId);
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (noteId) {
      setActiveId(noteId);
      return;
    }
    if (notes?.[0]) {
      navigate(`note/${notes[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-sparse-arrays
  }, [noteId, notes]);

  const handleAddNewNote = () => {
    submit(
      {
        content: '',
        folderId,
      },
      { method: 'post', action: `/folders/${folderId}` }
    );
  };

  return (
    <>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={4} sx={{ p: '8px', height: "100%" }}>
          <List
            subheader={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>Note List</Typography>
                <Tooltip title='Add Note' onClick={handleAddNewNote}>
                  <IconButton size='small'>
                    <NoteAddOutlined />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            {
              notes.map(({ id, content, updatedAt }) => {
                return (
                  <Link
                    key={id}
                    to={`note/${id}`}
                    style={{ textDecoration: "none" }}
                    onClick={() => setActiveId(id)}
                  >
                    <Card sx={{ mb: "5px", bgcolor: id === activeId ? "rgb(255 211 140)" : "" }}>
                      <CardContent sx={{ '&:last-child': { pb: '10px' }, padding: '10px' }}>
                        <div
                          style={{ fontSize: "14px", padding: 0, "&p": { padding: 0 } }}
                          dangerouslySetInnerHTML={{
                            __html: `${content.substring(0, 30) || "Empty"}`
                          }}
                        />
                        <Typography sx={{ fontSize: '10px' }}>
                          {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })
            }
          </List>
        </Grid>
        <Grid item xs={8} sx={{ height: "100%", p: '8px', borderLeft: "1px solid #F1F1F1" }}>
          <Outlet />
        </Grid>
      </Grid >
    </>
  )
}
