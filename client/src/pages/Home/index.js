import React from "react";
import { HomePageStyle } from "./styles";
import { Grid } from "@mui/material";
import FolderList from "../../components/FolderList";
import { Outlet, useLoaderData } from "react-router-dom";

function HomePage() {
  const { folders } = useLoaderData();

  return (
    <HomePageStyle>
      <Grid container sx={{ boxShadow: '0 0 15px 0 rgb(193 193 193 / 60%)' }}>
        <Grid item xs={3} sx={{ p: "10px", bgcolor: '#7D9D9C', minHeight: "50vh" }} >
          <FolderList folders={folders} />
        </Grid>
        <Grid item xs={9} sx={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </HomePageStyle>
  );
}

export default HomePage;