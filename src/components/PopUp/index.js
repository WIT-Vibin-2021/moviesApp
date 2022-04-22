import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import FilterCard from "../filterMoviesCard";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList"
import SortIcon from "@material-ui/icons/Sort"
import { CenterFocusStrong } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getVideo2 } from "../../api/tmdb-api";


const useStyles = makeStyles((theme) => ({
    popup: {
        background:"#e1e1e1",        
        top:"100px",
        left:"20%",
        width:"560px",
        position:"absolute",        
        padding:"30px", 
        
    },
    popupinner: {               
        alignSelf: 'stretch',
    },            
  }));  
const Popup = (props) => {
    const classes = useStyles();
        return(props.trigger)?(
            <div className={classes.popup}>
                <div  className={classes.popupinner}>
                
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${props.trigger2}`}title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <br/><button onClick={()=>props.setTrigger(false)}>Close</button><br/>                               
                </div>
            </div>
        ):"";
  };

export default Popup;