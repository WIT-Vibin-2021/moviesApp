import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovies,getMoviePages } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter,} from "../components/movieFilterUI";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { ThreeSixty } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
//import { number } from "prop-types";
//import Pagination from "../components/Pagination/pagination";
//import ReactPaginate from "react-paginate";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const HomePage = (props) => {
  
  const { filterValues, setFilterValues, filterFunction } = useFiltering([],[titleFiltering, genreFiltering]);

  //Pagination - Open
  //commented for pagination // const { data, error, isLoading, isError } = useQuery("discover", getMovies);  
  const [page, setPage] = React.useState(1);  
  const { data, error, isLoading, isError, isFetching, isPreviousData } = useQuery(["pages", page ],getMoviePages);  

  function handlePaginationChange(e, value) {
    setPage(value);    
  }
  //Pagination - Close

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const newf = { name: type, value: value };
    const newFilters = type === "title" ? [newf, filterValues[1]] : [filterValues[0], newf];
    setFilterValues(newFilters);
  };
  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);
  
  // console.log(data)
  // console.log(page)
  // console.log("setPage")

  return (
    <>
    
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} />
        }}
      />      
      <MovieFilterUI
        filterInputChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        //languageFilter={filterValues[2].value}
      />
        {/* Next and Previous Pagination Tags - Open       
        <button
          onClick={() => setPage(old => Math.max(old - 1, 0))}
          disabled={page === 1}
        >
        Previous Page
        </button>{' '}
        <button
          onClick={() => setPage(old => Math.max(old + 1, 0))}         
        >
        Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}{' '} */}
        
        <div align="center">
        <span>Current Page: {page}</span>
        </div>
        <div align="center">
        <Pagination
          count={data.total_pages}
          variant="outlined" color="secondary"   shape="rounded" 
          className='pagination'
          page={page}
          onChange={handlePaginationChange}
        />
        </div>
    </>
  );
};

export default HomePage;