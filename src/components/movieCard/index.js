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
import Popup from "../PopUp";
import { getVideo } from "../../api/tmdb-api";
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

export default function MovieCard({ movie, action }) { 
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [moviePopUp, setmoviePopUp] = useState("");
  const [videoData, setvideoData] = useState([]); 
  const classes = useStyles();
  const { favourites } = useContext(MoviesContext);

  if (favourites.find((id) => id === movie.id)) {
    movie.favourite = true;
  } else {
    movie.favourite = false
  }
  useEffect(() => {
    getVideo(movie.id).then((videoData) => {
      setvideoData(videoData);
    });    
  }, []);

  return (
    <Card className={classes.card}>
      <CardHeader
      className={classes.header}
      avatar={
        movie.favourite ? (
          <Avatar className={classes.avatar}>
            <FavoriteIcon />
          </Avatar>
        ) : null
      }
      title={
        <Tooltip  title={<h2 style={{ color: "white" }}>{movie.title}</h2>} >
          <Typography className={classes.text} variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        </Tooltip>
      }      
      />          
      <CardMedia 
        className={classes.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : `${process.env.PUBLIC_URL}/assets/film-poster-placeholder.png`
        }
        onClick={()=>{setButtonPopUp(true); setmoviePopUp(videoData.results[0].key)}}        
      />      
      
      <CardContent>      
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
      <div>                           
        <Modal show={buttonPopUp} onHide={()=>setButtonPopUp(false)} className={classes.popup}>  
          <Modal.Header closeButton>Video related to the movie</Modal.Header>  
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