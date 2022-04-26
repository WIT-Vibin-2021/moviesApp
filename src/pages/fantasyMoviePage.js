import React,{useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import FantasyPage from "../components/fantasyMovieForm";
import Grid from "@material-ui/core/Grid";
const FantasyMovies= (props) => { 
 
    return (    
      <>   
      <div >
        <Grid container >         
          <Grid>
          <FantasyPage
            title="FantasyPage"/> 
          </Grid>
        </Grid>
      </div>                        
      </>
    );
  };
  
  export default FantasyMovies; 