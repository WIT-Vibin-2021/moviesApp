import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getTopRatedMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
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

const TopRatedMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("topratedmovies", getTopRatedMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const newf = { name: type, value: value };
    const newFilters =
      type === "title" ? [newf, filterValues[1]] : [filterValues[0], newf];
    setFilterValues(newFilters);
  };

  const movies = data ? data.results : [];
  console.log(movies)
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Top Rated Movies"
        movies={displayedMovies}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} />
        }}
      />
      <MovieFilterUI
        filterInputChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default TopRatedMoviesPage;