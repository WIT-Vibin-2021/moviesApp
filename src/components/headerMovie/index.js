import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";

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
    <Paper component="div" className={classes.root}>
      <IconButton aria-label="go back" onClick={() => history.goBack()}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      <Typography variant="h4" component="h3">
        {movie.title}
        <a href={movie.homepage}>
          <HomeIcon color="primary" />
        </a>
        <br />
        <span className={classes.tagLine}>{`   "${movie.tagline}"`} </span>
      </Typography>
      <IconButton aria-label="go forward" onClick={() => history.goForward()}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;