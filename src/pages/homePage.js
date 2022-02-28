import React from "react";
import Header from "../components/headerMovieList";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../components/movieList";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

const MovieListPage = (props) => {
  const classes = useStyles();
  const movies = props.movies;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={"Home Page"} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList movies={movies}></MovieList>
      </Grid>
    </Grid>
  );
};
export default MovieListPage;