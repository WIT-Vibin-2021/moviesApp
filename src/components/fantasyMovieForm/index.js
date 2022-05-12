import React,{useEffect, useState,useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getGenres,getLanguages, getPeoples } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import FilterListIcon from "@material-ui/icons/FilterList"
import Fab from "@material-ui/core/Fab";  
import DatePicker from "react-datepicker";
import { AuthContext } from "../../contexts/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    top:"20%",
    display:"space-around",
    maxWidth: 345,
    backgroundColor: "rgb(232,232,232)",    
  },  
  media: { height: 300 },
  formControl: {     
    margin: theme.spacing(5),
    minWidth: 220,         
  },  
  formControlOverview: {   
    margin: theme.spacing(5),      
    minWidth: "50%",       
  },  
  line: {
    height: "1px",
    margin: theme.spacing(1),
    width: 220,
    background: "rgb(191,191,191)",
  },
  listPick: {
    height: "1px",   
  },
  datepicker: { 
    face :"Arial", 
    minWidth: 220,size:"20px", height:"30px",},
}));
export default function FantasyMovies(props) {
    useEffect(() => {
        getLanguages().then((datalanguages) => {
          setLanguages(datalanguages);
        });    
      }, []);
    const context = useContext(AuthContext)
    const classes = useStyles();
    const { data:dataG, error, isLoading, isError } = useQuery("genres", getGenres);
    const { data:dataC, error2, isLoading2, isError2 } = useQuery("peoples", getPeoples);    
    
    const [datalanguages, setLanguages] = useState([]);    
    //const [datalanguages2, setLanguages2] = useState([]);    
    //const [datagenres, setGenres] = useState([]);

    const [titlevalue, setTitle] = useState([]);
    const [genrevalue, setGenreValue] = useState([]);
    const [Langvalue, setLangValue] = useState([]);
    const [releaseDate, setStartDate] = useState("");    
    const [timevalue, setTime] = useState([]);
    const [overviewvalue, setOverView] = useState([]);

    var genres=[];
     if (dataG!==undefined)  
     {    genres = dataG.genres;}

    var peoples=[];
     if (dataC!==undefined)  
     {    peoples = dataC.results;}
     

    const [formState, setFormState] = React.useState({
        userRoles: []
    });

    const handleFieldChange = event => {
        console.log(event);
        event.persist();
        setFormState(formState => ({
            ...formState,
            [event.target.name]:
            event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
        }));
    };
    const createMovie = () =>{        
        console.log("Fantasy Movie Saving...")
        console.log(genrevalue)
        context.fantasyMoviePost(titlevalue, genrevalue.toString(), Langvalue, releaseDate, timevalue,overviewvalue);       
    }
  return (
    <>
      <CardContent><br/>
        <Typography variant="h5" component="h1"className={classes.formControl}>            
          Fantasy Movies Creation
          </Typography>
        {/* --------Title--------- */} 
        <FormControl className={classes.formControl}>          
          <TextField                      
            id="title"
            label="Title of the movie"
            type="search"   
            onChange={e => setTitle(e.target.value)}                         
          />    
        </FormControl>
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

          {/* ------------Release Date-------- */}
          <FormControl className={classes.formControl}>
          <font face="Arial" size="20px">Release Date</font>          
          <DatePicker className={classes.datepicker} id="yearSelect"
            selected={releaseDate}            
            showDatePicker
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            yearItemNumber={10}
          />          
        </FormControl>
        <br/>
          {/* ------------Running Time-------- */}
        <FormControl className={classes.formControl}>          
        <font face="Arial" size="20px">Running Time</font>
         <input type="time" step={1} 
          onChange={e => setTime(e.target.value)}/>    
        </FormControl>
          {/* ------------Cast-------- */}
        <FormControl className={classes.formControl}>    
            <TextField 
                select
                name="userRoles"
                id="userRoles"                
                label="Cast Members"
                SelectProps={{
                multiple: true,
                value: formState.userRoles,
                onChange: handleFieldChange
                }}
            >
                {peoples.map((people) => {
                return (
                    <MenuItem key={people.id} value={people.id}>
                    {people.name}
                    </MenuItem>
                );
            })}
            </TextField>
        </FormControl>
        <br/>
          {/* ------------Overview-------- */}
        <FormControl className={classes.formControlOverview}>          
          <TextField                      
            id="overView"
            label="OverView"
            type="text"  
            onChange={e => setOverView(e.target.value)}                          
          />    
        </FormControl>

      </CardContent>    
        {/* ------------Save Button-------- */}
        <FormControl className={classes.formControl}>          
            <input type="file"/>                          
        </FormControl><br/>
        <Fab className={classes.formControl}
        color="secondary"
        variant="extended"  
        onClick={ createMovie}                      
      >        
        Save Fantasy Movie
      </Fab>
      </>
  );
}