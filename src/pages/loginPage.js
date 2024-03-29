
import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LogInPage from "../components/Login";
import SignUpPage from "../components/SignUp";
import Grid from "@material-ui/core/Grid";
import { AuthContext } from "../contexts/authContext";

const FantasyMovies= (props) => { 
  const useStyles = makeStyles((theme) => ({
    root: {      
      justifyContent: "space-around",   
      backgroundColor: "rgb(232,232,232)",    
    },    
  }));
  const classes = useStyles();
  const context = useContext(AuthContext)
  console.log(context)
    if (context.isAuthenticated === true) {
      return <Redirect to={"/"} />;
    }
    return (    
      <>   
      <div >
        <Grid container className={classes.root}>         
          <Grid>
          <LogInPage
            title="LogInPage"/> 
          </Grid>
          <Grid  className={classes.root}>          
            <SignUpPage
            title="SignUpPage"/> 
          </Grid>
        </Grid>
      </div>                        
      </>
    );
  };
  
  export default FantasyMovies; 