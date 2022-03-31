import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import FilterCard from "../filterMoviesCard";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

export const titleFilter = function (movie, value) {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = function (movie, value) {
  const genreId = Number(value);
  return genreId > 0 ? movie.genre_ids.includes(genreId) : true;   
};

export const languageFilter = function (movie, value) {
  const languageId = (value);
  return languageId != "" && languageId != "xx" ? movie.original_language.includes(languageId) : true;
};  //Ref: https://www.themoviedb.org/talk/52312a4c19c29536de06caf7    Time being "xx" and null as "No Language"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: theme.spacing(8),
    position: "fixed",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const MovieFilterUI = ({ filterInputChange, titleFilter, genreFilter, languageFilter }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        className={classes.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={filterInputChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          languageFilter={languageFilter}
        />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;