import React from "react";
import Header from "../headerMovieList";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../movieList";

const useStyles = makeStyles((theme) => ({
  root: { 
    backgroundColor: "rgb(0, 0, 0)",
    minHeight: "100vh",
    paddingTop: theme.spacing(7),
  }
}));

function MovieListPageTemplate({ movies, title, action }) {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <Grid container >
          <Grid item xs={12}>
            <Header title={title} />
          </Grid>
          <Grid item container spacing={5}>
            <MovieList action={action} movies={movies} />
          </Grid>
        </Grid>

      </div>
  );
}
export default MovieListPageTemplate;