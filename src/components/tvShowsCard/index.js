import React, { useContext,useEffect , useState  } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import StarRateIcon from "@material-ui/icons/StarRate";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import {Tooltip} from "@material-ui/core"
import { getTvVideo } from "../../api/tmdb-api";
import { Modal} from 'react-bootstrap'; 

const useStyles = makeStyles({
  card: { maxWidth: 345 },
  text: { maxHeight: 20 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  popup: {    
    top:"20%",    
},
});

export default function TvShowsCard({ tvshows, action }) {  
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [moviePopUp, setmoviePopUp] = useState("");
  const [videoData, setvideoData] = useState([]); 
  const classes = useStyles();
  useEffect(() => {
    getTvVideo(tvshows.id).then((videoData) => {
      setvideoData(videoData);
    });    
  }, []);
  return (
    <Card className={classes.card}>
      <CardHeader
      className={classes.header}
      title={
        <Tooltip  title={<h2 style={{ color: "white" }}>{tvshows.name}</h2>} >
          <Typography className={classes.text} variant="h5" component="p">
            {tvshows.name}{" "}
          </Typography>
        </Tooltip>
      }      
      />          
      <CardMedia 
        className={classes.media}
        image={
          tvshows.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tvshows.poster_path}`
            : `${process.env.PUBLIC_URL}/assets/film-poster-placeholder.png`
        }
        onClick={()=>{setButtonPopUp(true); setmoviePopUp(videoData.results[0].key)}}
      />
      
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {tvshows.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {tvshows.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(tvshows)}
        <Link to={`/tvshows/${tvshows.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            Know More...
          </Button>
        </Link>
      </CardActions>
      <div>                           
        <Modal show={buttonPopUp} onHide={()=>setButtonPopUp(false)} className={classes.popup}>  
          <Modal.Header closeButton>Video related to the show</Modal.Header>  
          <Modal.Body>
                <div >                                
                    <iframe width="465" height="315" src={`https://www.youtube.com/embed/${moviePopUp}`}title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    {/* <br/><button onClick={()=>props.setTrigger(false)}>Close</button><br/>                                */}
                </div>                
            </Modal.Body>   
        </Modal>  
      </div>
    </Card>
  );
}