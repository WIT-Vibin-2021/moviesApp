import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { AuthContext } from "../../contexts/authContext";
import {Tooltip} from "@material-ui/core"

const AddToFavouritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const authcontext = useContext(AuthContext);

  const handleAddToFavourites = (e) => {    
    e.preventDefault();
    if(authcontext.isAuthenticated)
      context.addToFavourites(movie);
    else
      alert("Please Login to select the Favourites")
  };   
  return (
    <Tooltip  title={<h6 style={{ color: "white" }}>Favorite</h6>} >
      <IconButton aria-label="add to favorites" onClick={handleAddToFavourites}>
        <FavoriteIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );  
};

export default AddToFavouritesIcon;