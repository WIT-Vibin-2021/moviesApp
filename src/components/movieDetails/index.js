import React, { useCallback,useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MonetizationIcon from "@material-ui/icons/MonetizationOn";
import StarRate from "@material-ui/icons/StarRate";
import TheatersIcon from '@material-ui/icons/Theaters';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import Drawer from "@material-ui/core/Drawer";
import MovieReviews from '../movieReviews'
import { Language, MovieSharp } from "@material-ui/icons";
import {Tooltip} from "@material-ui/core"
import Popup from "../PopUp";
import { getVideo } from "../../api/tmdb-api";

const useStyles = makeStyles((theme) => ({
  chipRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
    Bold:20
  },
  chipLabel: {
    margin: theme.spacing(0.5),
  },
  fab: {  
    position: "fixed",
    top: theme.spacing(10),
    right: theme.spacing(2),
  },
}));

const MovieDetails = ( {movie}) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);   
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [moviePopUp, setmoviePopUp] = useState("");
  const [videoData, setvideoData] = useState([]);
  useEffect(() => {
    getVideo(movie.id).then((videoData) => {
      setvideoData(videoData);
    });    
  }, []);
  return (
    <>    
      <Typography variant="h5" component="h3" >
        Overview        
      </Typography>      
      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>
      <div className={classes.chipRoot}>
      <Paper component="ul" className={classes.chipSet} elevation={0} >
        <li>
          <Chip label="Genres" className={classes.chipLabel} color="primary" />          
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}> 
            <Chip label={g.name} className={classes.chip} />
          </li>
        ))}
      </Paper>
      <br></br>
      <Paper component="ul" className={classes.chipSet} elevation={0} >
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip icon={<TheatersIcon />}label={`Released: ${movie.release_date}`} />        
      </Paper>  <br></br>
      <Paper component="ul" className={classes.chipSet} elevation={0} >      
        <Tooltip  title={<h3 style={{ color: "white" }}>{movie.homepage}</h3>}>        
        <Chip icon={<Language />}label="Movie Home Page" color="primary" variant="outlined" component="a" href={movie.homepage} clickable />  
        </Tooltip>
      </Paper>
      <Paper component="ul" className={classes.chipSet} elevation={0} >             
          <Chip icon={<MovieSharp />}label="Similar Movies (Keywords & Genres)" 
          color="primary" variant="outlined"  component="a" href={`/similar/${movie.id}`} clickable />           
      </Paper>
{/* ------------------------------------------------------------------------------- */}
      <Paper component="ul" className={classes.chipSet} elevation={0} >             
          <Chip icon={<MovieSharp />}label="Video" 
          onClick={()=>{setButtonPopUp(true); setmoviePopUp(videoData.results[0].key)}}
          color="primary" variant="outlined" clickable />           
      </Paper>
      <Popup trigger={buttonPopUp} setTrigger={setButtonPopUp} trigger2={moviePopUp}>           
      </Popup>
      </div>            
{/* -------------------------------------------------------------------------------- */}            
      <Fab    
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        className={classes.fab}
      >
      <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};
export default  MovieDetails ; 