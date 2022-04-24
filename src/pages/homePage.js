import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovies,getMoviePages } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import useMovieSorting from "../hooks/useMovieSorting";
import MovieFilterUI, { titleFilter, genreFilter,languageFilter, sortingValue} from "../components/movieFilterUI";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { Pagination } from "@material-ui/lab";

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

const languageFiltering = {
  name: "language",
  value: "",
  condition: languageFilter,
};
const sortingOrderValue = {
  name: "None",
  value: "",
  condition: sortingValue,
};
const HomePage = (props) => {  
  // useFiltering is a Hook
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],    
    [titleFiltering, genreFiltering, languageFiltering]
  );

  const { sortValues, setSortValues, sortFunction } = useMovieSorting(
    [],
    [sortingOrderValue]
  );

  const changeSortValues = (type, value) => {
    const sortValues = { name: type, value: value };
    setSortValues(sortValues);
  }

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
    //const newFilters = type === "title" ? [newf, filterValues[1]] : [filterValues[0], newf];
    var newFilters = [];  
    switch(type){
      case "language":
        newFilters =  [filterValues[0],filterValues[1], newf];
        break;
      case "title":
        newFilters = [newf, filterValues[1], filterValues[2]];
        break;
      case "genre":
        newFilters =  [filterValues[0], newf, filterValues[2]];
        break;      
      //default: newFilters = []; break;
    }
    setFilterValues(newFilters);
  };
  const movies = data ? data.results : [];
  var displayedMovies = filterFunction(movies);  
  displayedMovies = sortFunction(displayedMovies);

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
        sortingInputChange={changeSortValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        languageFilter={filterValues[2].value}
        sortingValue={sortValues.value}
      />
        {/* Pagination -Simple - Next and Previous button */}
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
    </>
  );
};

export default HomePage;