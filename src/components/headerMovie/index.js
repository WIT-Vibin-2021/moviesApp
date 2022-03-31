import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { Movie, PlayArrow } from "@material-ui/icons";
import {Tooltip} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: theme.spacing(1.5),      
  },
  tagLine: {
    fontSize: "1.5rem",
  },
}));

const MovieHeader = ({ movie }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper component="div" className={classes.root} elevation={0} variant="outlined" square >
      <IconButton aria-label="go back" onClick={() => history.goBack()}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      <Typography variant="h4" component="h3" align="Center">
        {movie.title}<br/>
        <span className={classes.tagLine}>{`   "${movie.tagline}"`} </span>
        <br/> 
        {/* <Tooltip  title={<h3 style={{ color: "white" }}>{movie.homepage}</h3>}>
        <a href={movie.homepage}><Movie color="primary" fontSize="large" style={{ color: 'red' }} /></a>       
        </Tooltip> */}
      </Typography>
      <IconButton aria-label="go forward" onClick={() => history.goForward()}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;