import React from "react";
import { Grid } from "@mui/material";
import { Outlet, useLoaderData } from "react-router-dom";
import styled from "@emotion/styled"
import FolderList from "../components/FolderList";

export const HomePageStyle = styled.div`
  margin: 24px auto;
  text-align: center;
`
// const FolderList = React.lazy(() => import('../components/FolderList'));

function HomePage() {
  const { folders } = useLoaderData();

  return (
    <HomePageStyle>
      <Grid container sx={{ boxShadow: '0 0 15px 0 rgb(193 193 193 / 60%)' }}>
        <Grid item xs={12} md={3} sx={{ p: "10px", bgcolor: '#7D9D9C', minHeight: "50vh" }} >
          <FolderList folders={folders} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Outlet />
        </Grid>
      </Grid>
    </HomePageStyle >
  );
}

export default HomePage;