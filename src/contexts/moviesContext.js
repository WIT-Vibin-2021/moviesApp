import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { addFavouriteMovies,getFavouriteMovies } from "../api/movie-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const authcontext = useContext(AuthContext);

  const [myReviews, setMyReviews] = useState( {} ) 
  const [favourites, setFavourites] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  const addToFavourites = async (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);            
      const result = await addFavouriteMovies(authcontext.userId, movie.id);
    }
    setFavourites(updatedFavourites);
  };
  const loadAllFavourites = async (movie) => {
    const resultfav = await getFavouriteMovies(authcontext.userid);
    const myfavourites =  resultfav.favourites.filter(t=>t != null);
    setFavourites(myfavourites)
  }
  loadAllFavourites();
  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
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