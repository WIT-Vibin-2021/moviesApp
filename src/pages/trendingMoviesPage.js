import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getTrendingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import useMovieSorting from "../hooks/useMovieSorting";
import MovieFilterUI, { titleFilter, genreFilter,languageFilter, sortingValue} from "../components/movieFilterUI";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

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
const TrendingMoviesPage = (props) => {  
  const { data, error, isLoading, isError } = useQuery("upcoming", getTrendingMovies);

  // useFiltering is a Hook
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [], [titleFiltering, genreFiltering, languageFiltering]
  );

  const { sortValues, setSortValues, sortFunction } = useMovieSorting(
    [], [sortingOrderValue]
  );

  const changeSortValues = (type, value) => {
    const sortValues = { name: type, value: value };
    setSortValues(sortValues);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const newf = { name: type, value: value };    
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
      default: newFilters = []; break;
    }
    setFilterValues(newFilters);
  };
  const movies = data ? data.results : [];
  var displayedMovies = filterFunction(movies);  
  displayedMovies = sortFunction(displayedMovies);
  return (    
    <>
    
      <PageTemplate
        title="Trending this week"
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
    </>
  );
};

export default TrendingMoviesPage; 