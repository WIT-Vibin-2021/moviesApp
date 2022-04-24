import React,{useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getGenres,getLanguages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import FilterListIcon from "@material-ui/icons/FilterList"
import SortIcon from "@material-ui/icons/Sort"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "rgb(232,232,232)",    
  },  
  media: { height: 300 },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    backgroundColor: "rgb(232,232,232)",     
  },  
}));

export default function FilterMoviesCard(props) {
  const classes = useStyles();
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const [datalanguages, setLanguages] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);

  // API Call for list of language
  useEffect(() => {
    getLanguages().then((datalanguages) => {
      setLanguages(datalanguages);
    });    
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  //--- Set the dropdownliat ------------------
  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleUserInput = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW    
  };
  //--- Set the dropdownliat -----------------

  const handleTextChange = (e, props) => {
    handleUserInput(e, "title", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleUserInput(e, "genre", e.target.value);
  };
  
  const handleLanguageChange = (e) => {
    handleUserInput(e, "language", e.target.value);
  };

  //Sorting Handling
  const handleUserInputSort = (e, type, value) => {
    e.preventDefault();
    props.onUserSortInput(type, value);
  };
  const handleSortChange = (e) => {
    handleUserInputSort(e, "sort-select", e.target.value); 
    console.log(e.target.value);      
  };
  
  //Sorting Handling

  return (
    <>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterListIcon fontSize="small" />
          Filter the movies
        </Typography>
        {/* ---------------Serach------------------- */}
        <TextField
          InputProps={{className: classes.input}}
          InputLabelProps={{className: classes.input}}
          className={classes.formControl}
          id="filled-search"
          label="Search field"
          type="search"
          value={props.titleFilter}          
          onChange={handleTextChange}
        />
        {/* ----------Genres ----------------*/}
        <FormControl className={classes.formControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select            
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* ---------Language-------------------- */}
        <FormControl className={classes.formControl}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={props.languageFilter}
            onChange={handleLanguageChange}
          >
            {datalanguages.map((language) => {
              return (
                <MenuItem key={language.iso_639_1} value={language.iso_639_1}>
                  {language.english_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>

      {/* --------Sort--------------------------- */}
      <CardContent>
        <Typography variant="h5" component="h1">
        <SortIcon fontSize="small" />
          Sort the movies.
        </Typography>

        <FormControl className={classes.formControl}>
          <InputLabel id="sort-label">Sorting Order</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"            
            value={props.sortingValue}                   
            onChange={handleSortChange}
          >                      
          <MenuItem value={"movie-asc"}>Movies List(A-Z)</MenuItem>
          <MenuItem value={"movie-desc"}>Movies List(Z-A)</MenuItem>               
          </Select>
        </FormControl>               

      </CardContent>
    </Card>
      </>
  );
}