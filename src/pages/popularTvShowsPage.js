import React, { useState }from "react";
import PageTemplate from '../components/templateTvShowsListPage'
import { getTvShowsPages } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

const PopularTvShows = (props) => {

  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(["tvshows", page], getTvShowsPages);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const nextClickHandler = (event) => {
    let currentpage = page;
    currentpage = currentpage +1 ;
    setPage(currentpage);
   }
   const previousClickHandler = (event) => {
    let currentpage = page;
    if(currentpage ==1)
    {

    }
    else{
      currentpage = currentpage -1 ;
    }
    setPage(currentpage);
   }

  const tvshows = data ? data.results : [];

  return (
    <>
    <div>
      hello
      <PageTemplate
      title="Popular Tv Shows"
      tvshows={tvshows}
      action={(tvshow) => {        
        return <AddToFavouritesIcon tvshow={tvshow} />
      }}
      />      
    </div>
  </>
  );
};
export default PopularTvShows;