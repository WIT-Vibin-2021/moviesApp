import React, { useCallback,useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MonetizationIcon from "@material-ui/icons/MonetizationOn";
import StarRate from "@material-ui/icons/StarRate";
import TheatersIcon from '@material-ui/icons/Theaters';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DateIcon from '@material-ui/icons/DateRangeOutlined';
import TvIcon from '@material-ui/icons/Tv';
import Fab from "@material-ui/core/Fab";
import Drawer from "@material-ui/core/Drawer";
// import MovieReviews from '../movieReviews'
import { Language, MovieSharp } from "@material-ui/icons";
import {Tooltip} from "@material-ui/core"
import NumberIcon from '@material-ui/icons/ConfirmationNumber';
import Popup from "../PopUp";
 import { getTvVideo } from "../../api/tmdb-api";
 import { Modal} from 'react-bootstrap'; 

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
  popup: {    
    top:"20%",    
},
}));

const TvShowsDetails = ( {tvshows}) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);   
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [tvshowsPopUp, settvshowsPopUp] = useState("");
  const [videoData, setvideoData] = useState([]);
  useEffect(() => {
    getTvVideo(tvshows.id).then((videoData) => {
      setvideoData(videoData);
    });    
  }, []);
  return (
    <>    
      <Typography variant="h5" component="h3" >
        Overview 
      </Typography>      
      <Typography variant="h6" component="p">
        {tvshows.overview}
      </Typography>
      <div className={classes.chipRoot}>
      <Paper component="ul" className={classes.chipSet} elevation={0} >
        <li>
          <Chip label="Genres" className={classes.chipLabel} color="primary" />          
        </li>
        {tvshows.genres.map((g) => (
          <li key={g.name}> 
            <Chip label={g.name} className={classes.chip} />
          </li>
        ))}
        <li>
          <Chip label="Network" className={classes.chipLabel} color="primary" />          
        </li>
        {tvshows.networks.map((g) => (
          <li key={g.name}> 
            <Chip label={g.name} className={classes.chip} />
          </li>
        ))}
      </Paper>      
      <Paper component="ul" className={classes.chipSet} elevation={0} >        
        <Chip icon={<TvIcon />} label={`${tvshows.status}`}/>
        <Chip icon={<StarRate />} label={`${tvshows.vote_average} (${tvshows.vote_count})`}/>              
      </Paper>    
      <Paper component="ul" className={classes.chipSet} elevation={0} >
        <li>
          <Chip label="Season \ AirDate" className={classes.chipLabel} color="primary" />          
        </li>
        {tvshows.seasons.map((g) => (
          <li key={g.air_date}>
            <Chip label={g.name+' \\ '+g.air_date} className={classes.chip} />            
          </li>          
        ))}<br/>      
      </Paper>
      <Paper component="ul" className={classes.chipSet} elevation={0} > 
      <Chip icon={<TheatersIcon />} label={`No.of Seasons ${tvshows.number_of_seasons}`}/>
      <Chip icon={<DateIcon />}label={`First Air Date: ${tvshows.first_air_date}`} />        
      <Chip icon={<TheatersIcon />}label={`Last Air Date: ${tvshows.last_air_date}`} />        
      <Chip icon={<NumberIcon />} label={`No. of Episodes ${tvshows.number_of_episodes}`} />
      </Paper>  
      <br></br>

      <Paper component="ul" className={classes.chipSet} elevation={0}  >      
        <Tooltip  title={<h3 style={{ color: "white" }}>{tvshows.homepage}</h3>}>        
        <Chip icon={<Language />}label="Tv Shows Home Page" color="primary" variant="outlined" component="a" href={tvshows.homepage} clickable />  
        </Tooltip>
      </Paper>
{/* ------------------------------------------------------------------------------- */}
      <Paper component="ul" className={classes.chipSet} elevation={0} >             
          <Chip icon={<MovieSharp />}label="Video" 
          onClick={()=>{setButtonPopUp(true); settvshowsPopUp(videoData.results[0].key)}}
          color="primary" variant="outlined" clickable />           
      </Paper>
      {/* <Popup trigger={buttonPopUp} setTrigger={setButtonPopUp} trigger2={tvshowsPopUp}>           
      </Popup>
       */}

<div>                           
        <Modal show={buttonPopUp} onHide={()=>setButtonPopUp(false)} className={classes.popup}>  
          <Modal.Header closeButton>Video related to the show</Modal.Header>  
          <Modal.Body>
                <div >                                
                    <iframe width="465" height="315" src={`https://www.youtube.com/embed/${tvshowsPopUp}`}title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    {/* <br/><button onClick={()=>props.setTrigger(false)}>Close</button><br/>                                */}
                </div>                
            </Modal.Body>   
        </Modal>  
      </div>
      </div>            
{/* -------------------------------------------------------------------------------- */}            
      {/* <Fab    
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
      </Drawer> */}
    </>
  );
};
export default  TvShowsDetails ; 