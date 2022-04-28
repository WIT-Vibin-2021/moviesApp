
import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FantasyPage from "../components/Login";
import SignUpPage from "../components/SignUp";
import Grid from "@material-ui/core/Grid";
import { AuthContext } from "../contexts/authContext";

const FantasyMovies= (props) => { 
  const useStyles = makeStyles((theme) => ({
    root: {      
      justifyContent: "space-around",      
    },    
  }));
  const classes = useStyles();
  const context = useContext(AuthContext)
    if (context.isAuthenticated === true) {
      return <Redirect to={"/"} />;
    }
    return (    
      <>   
      <div >
        <Grid container className={classes.root}>         
          <Grid>
          <FantasyPage
            title="FantasyPage"/> 
          </Grid>
          <Grid  className={classes.root}>          
            <SignUpPage
            title="FantasyPage"/> 
          </Grid>
        </Grid>
      </div>                        
      </>
    );
  };
  
  export default FantasyMovies; 