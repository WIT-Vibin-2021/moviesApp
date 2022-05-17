import React, { useState, useContext,useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import { addFavouriteMovies,getFavouriteMovies,removeFavouriteMovies } from "../api/movie-api";
import { useHistory } from "react-router-dom";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const authcontext = useContext(AuthContext);

  const [myReviews, setMyReviews] = useState( {} ) 
  const [favourites, setFavourites] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const  history = useHistory()

  const addToFavourites = async (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);            
      const result = await addFavouriteMovies(authcontext.userId, movie.id);
    }
    setFavourites(updatedFavourites);
  };
  
  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    console.log("Movie -----------Fav----")
    console.log(favourites)
    const result =  removeFavouriteMovies(authcontext.userId, movie.id);    
    setFavourites(favourites.filter((mId) => mId !== movie.id));
    window.location.reload(false)
    //history.push("/movies/favourites");
    //window.location.href = "/movies/favourites"
    
    //history.push("/movies/favourites")
  };
  

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,   
        setAuthenticated       
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;