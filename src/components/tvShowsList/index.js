import React from "react";
import TvShows from "../tvShowsCard";
import Grid from "@material-ui/core/Grid";

const TvShowsList = ( {tvshows, action }) => {
  let tvShowsCards = tvshows.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TvShows key={m.id} tvshows={m} action={action} />
    </Grid>
  ));
  return tvShowsCards;
};
export default TvShowsList;

