import React from "react";
import Header from "../headerMovieList";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TvShowsList from "../tvShowsList";

const useStyles = makeStyles((theme) => ({
  root: { 
    backgroundColor: "rgb(3,37,65)",
    minHeight: "100vh",
    paddingTop: theme.spacing(7),
  }
}));

function TvShowsListPageTemplate({ tvshows, title, action }) {
  const classes = useStyles();
  return (

       <div className={classes.root}>
         <Grid container >
           <Grid item xs={12}>
             <Header title={title} />
           </Grid>
           <Grid item container spacing={5}>
             <TvShowsList action={action} tvshows={tvshows} />
           </Grid>
         </Grid>

       </div>
   );
}
export default TvShowsListPageTemplate;