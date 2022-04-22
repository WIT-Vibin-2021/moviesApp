import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import FilterCard from "../filterMoviesCard";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList"
import SortIcon from "@material-ui/icons/Sort"
import { CenterFocusStrong } from "@material-ui/icons";

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

function Popup(props){
    const classes = useStyles();
        return(props.trigger)?(
            <div className={classes.popup}>
                <div  className={classes.popupinner}>
                <button onClick={()=>props.setTrigger(false)}>Close</button><br/>                
                <iframe width="560" height="315" src="https://www.youtube.com/embed/i8fAO_zyFAM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                {props.children}
                </div>
            </div>
        ):"";
}

export default Popup;

// import React from "react";
// import Popup from "reactjs-popup";

// class PopupVideo extends React.Component {
//   render() {
//     return(
//       <Popup open={this.props.open} modal>
//         {() => ( 
//           <>
//             // ...
//             <button onClick={() => this.props.setOpen(false)}>
//               close
//             </button>
//             <iframe width="560" height="315" src="https://www.youtube.com/embed/i8fAO_zyFAM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//           </>
//         )}
//       </Popup>
//     )
//   }
// }
//export default Popup;