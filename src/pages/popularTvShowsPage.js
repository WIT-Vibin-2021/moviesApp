import React, { useState }from "react";
import PageTemplate from '../components/templateTvShowsListPage'
import { getTvShowsPages } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { Pagination } from "@material-ui/lab";

const PopularTvShows = (props) => {

  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(["tvshows",  page], getTvShowsPages);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  function handlePaginationChange(e, value) {
    setPage(value);    
  }

  const tvshows = data ? data.results : [];

  return (
    <>
    <div>      
      <PageTemplate
      title="Popular Tv Shows"
      tvshows={tvshows}
      action={(tvshow) => {        
        return <AddToFavouritesIcon tvshow={tvshow} />
      }}
      />
      <div align="center">
        <span>Current Page: {page}</span>
        </div>
        <div>
        {/* Pagination - Orignal - < 1 2 3 4...500 > */}
        <Pagination
          // Limited to 500, TMDB API will allow max of 500 pages other than data.totalpages
          count={500} 
          variant="outlined" color="secondary"   shape="rounded" 
          className='pagination'
          page={page}
          onChange={handlePaginationChange}
        />        
        </div>      
    </div>
  </>
  );
};
export default PopularTvShows;