import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { AuthContext } from "../../contexts/authContext";

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
    <IconButton aria-label="add to favorites" onClick={handleAddToFavourites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );  
};

export default AddToFavouritesIcon;