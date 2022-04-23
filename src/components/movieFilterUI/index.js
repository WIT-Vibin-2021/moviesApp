import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import FilterCard from "../filterMoviesCard";
import MoviesSearchCriteria from "../moviesearchcriteria"
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList"
import SortIcon from "@material-ui/icons/Sort"
import { Search } from "@material-ui/icons";


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

export const sortingValue = function (movies, sortValue) {
  var sorted_out = movies;
  if(sortValue === "movie-asc")
  {
    sorted_out = movies.sort((a, b) => (a.title - b.title))
  }
  else if(sortValue === "movie-desc")
  {
    var temp = movies.sort((a, b) => (b.title - a.title))
    sorted_out = temp.reverse();
  }
  return sorted_out;
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: theme.spacing(7.5),
    position: "fixed",
    top: theme.spacing(1),
    right: theme.spacing(2),
  },
  fabSerach: {
    marginTop: theme.spacing(7.5),
    position: "fixed",
    top: theme.spacing(1),
    left: theme.spacing(2),
  },
  paper: {
    background: "#bfbfbf"
  }
}));

const MovieFilterUI = ({ filterInputChange, sortingInputChange, titleFilter, genreFilter, languageFilter, sortingValue }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSearchOpen, setDrawerSearchOpen] = useState(false);
 
  return (
    <>
      <Fab
        color="primary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        className={classes.fab}
      ><FilterListIcon/>  
        Filter / Sort   
        <SortIcon/> 
      </Fab>
      
      {/* -------------Search Button------------------------------ */}
      <Fab
        color="secondary"
        variant="extended"      
        onClick={() => setDrawerSearchOpen(true)}
        className={classes.fabSerach}
      >
        Search   
        <Search/> 
      </Fab>
      {/* ------------------------------------------- */}

      <Drawer  classes={{ paper: classes.paper }}
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >        
        <FilterCard 
          onUserInput={filterInputChange}
          onUserSortInput={sortingInputChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          languageFilter={languageFilter}
          sortingValue={sortingValue}
        />
      </Drawer>
      {/* --------------Search----------------------------- */}
      <Drawer  classes={{ paper: classes.paper }}
        anchor="right"
        open={drawerSearchOpen}
        onClose={() => setDrawerSearchOpen(false)}
      >
        <MoviesSearchCriteria 
          // onUserInput={filterInputChange}
          // onUserSortInput={sortingInputChange}
          // titleFilter={titleFilter}
          // genreFilter={genreFilter}
          // languageFilter={languageFilter}
          // sortingValue={sortingValue}
        />
      </Drawer>
      {/* ------------------------------------------- */}
    </>
  );
};

export default MovieFilterUI;