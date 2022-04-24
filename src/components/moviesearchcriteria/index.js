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
import Fab from "@material-ui/core/Fab";  
import { Search } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { useHistory,Link, } from "react-router-dom";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

// import { DatePicker  } from   '@material-ui/pickers/DatePicker';
// import { MuiPickersUtilsProvider  } from   '@material-ui/pickers';
import DatePicker from "react-datepicker";
import DatePickerCSS from "react-datepicker/dist/react-datepicker.css"

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
  line: {
    height: "1px",
    margin: theme.spacing(1),
    width: 220,
    background: "rgb(191,191,191)",
  },
  datepicker: { 
    face :"Arial",borderBottom: "2px", 
    minWidth: 220,size:"20px", height:"30px", border:"1px", backgroundColor: "rgb(232,232,232)", },
}));
export default function MoviesSearchCriteria(props) {
  const  history = useHistory()
  const [drawerSearchOpen, setDrawerSearchOpen] = useState(false);
  const [genrevalue, setGenreValue] = useState([]);
  const [Langvalue, setLangValue] = useState([]);
  const [sorttypevalue, setSortTypeValue] = useState([]);
  const [sortordvalue, setSortOrdValue] = useState([]);
  const classes = useStyles();
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const [datalanguages, setLanguages] = useState([]);
  const [datagenres, setGeneres] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);
  const [startDate, setStartDate] = useState("");

  
  const routeChange = () =>{ 
    var searchQuery = document.getElementById("searchText").value
    var searchYear = document.getElementById("yearSelect").value
    searchYear = (searchYear>0)?searchYear:"''"
    var searchGenre = (genrevalue>0)? genrevalue:"''"
    var searchLang = (Langvalue.length>0) ?Langvalue:"''"
    var searchType = (sorttypevalue.length>0)?sorttypevalue:"''"
    var searchSort = (sorttypevalue.length>0)? ((sortordvalue.length>0)?sorttypevalue+'.'+sortordvalue:"''"):"''"    
     let path = `/searchcriteria/`+searchGenre+`/`+ searchLang +`/`+ searchYear +`/`+ searchSort; 
     history.push(path);
  }

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
    //handleUserInput(e, "title", e.target.value);
  };

  const handleGenreChange = (e) => {
    
    handleUserInput(e, "genre", e.target.value);
  };
  
  const handleLanguageChange = (e) => {
    //handleUserInput(e, "language", e.target.value);
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
          Search Options
          </Typography>
        {/* --------Serach--------- */}
        {/* <FormControl className={classes.formControl}>          
          <TextField          
            className={classes.formControl}
            id="searchText"
            label="Search movie name"
            type="search"                            
          />    
        </FormControl> */}

        {/* -----------------Genres-------- */}
        <FormControl className={classes.formControl}>
          <InputLabel id="genrelbl">Genre</InputLabel>
          <Select            
            labelId="genrelbl"
            id="genre"
            value={props.genreFilter}
            onChange={event => {
              setGenreValue(event.target.value);
            }}
            
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

          {/* -------------Language-------- */}
          <FormControl className={classes.formControl}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={props.languageFilter}
            onChange={event => {
              setLangValue(event.target.value);
            }}
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

          {/* ------------ Year-------- */}
          <FormControl className={classes.formControl}>
          <font face="Arial" size="20px">Year of release</font>          
          <DatePicker className={classes.datepicker} id="yearSelect"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showYearPicker
            dateFormat="yyyy"
            yearItemNumber={9}
          />          
        </FormControl><div className={classes.line}></div>  <br></br>  

      {/* ------------ Sort Group--------- */}
        <fieldset className={classes.formControl}>             
        <font face="Arial" size="20px"><legend >Sort result by</legend></font>
        <FormControl>                
          {/* ------------ Type--------- */}
          <Select width="100%" labelId="sort-label" id="sort-select" value={props.sortingValue} 
          onChange={event => {
            setSortTypeValue(event.target.value);
          }}>                      
          
            <MenuItem value={"popularity"}>Popularity</MenuItem>
            <MenuItem value={"vote_average"}>Rating</MenuItem>
            <MenuItem value={"release_date"}>Release Date</MenuItem>
            <MenuItem value={"original_title"}>Original Title</MenuItem>
          </Select> 
          {/* ------------ Order--------- */}
          <RadioGroup row  name="position" defaultValue="top">        
            <FormControlLabel id="rdAscending" value="asc" control={<Radio />} label="Ascending" 
            onChange={event => {
            setSortOrdValue(event.target.value);
          }}/>
            <FormControlLabel id="rdDescending" value="desc" control={<Radio />} label="Descending" 
            onChange={event => {
              setSortOrdValue(event.target.value);
            }}/>
          </RadioGroup>            
        </FormControl> 
        </fieldset>         

      </CardContent>    
      <CardContent>              

{/* <IconButton className={classes.searchButton} type="submit" sx={{ p: '5px' }} aria-label="search"
            onClick={routeChange}>   
              <SearchIcon />            
            </IconButton>  */}
      <Fab
        color="secondary"
        variant="extended"      
        onClick={ routeChange}  
        // className={classes.fabSerach}
      >        
        Search           
      </Fab>
      </CardContent>
    </Card>
      </>
  );
}