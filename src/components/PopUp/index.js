import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    popup: {
        background:"#032541",        
        top:"30%",
        left:"42%",
        width:"560px",
        position:"absolute",        
        padding:"30px", 
        
    },
    popupinner: {               
        alignSelf: 'stretch',
    },
    popbutton: {               
        position: "absolute",
        top: "5px",
        right: "5px",        
        height: "100px",        
    },            
  }));  
const Popup = (props) => {
    const classes = useStyles();
        return(props.trigger)?(
            <div className={classes.popup}>
                <div className={classes.popbutton}><CloseIcon color="secondary" onClick={()=>props.setTrigger(false)}/></div>
                <div  className={classes.popupinner}>                                
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${props.trigger2}`}title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    {/* <br/><button onClick={()=>props.setTrigger(false)}>Close</button><br/>                                */}
                </div>                
            </div>
        ):"";
  };

export default Popup;