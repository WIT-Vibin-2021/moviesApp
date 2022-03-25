import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovies,getMoviePages } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter,} from "../components/movieFilterUI";
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

const HomePage = (props) => {
  //Pagination-------------------------------------
  //commented for pagination // const { data, error, isLoading, isError } = useQuery("discover", getMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([],[titleFiltering, genreFiltering]);

  //Pagination-------------------------------------
  const [page, setPage] = React.useState(1);
  const fetchProjects = (page = 1) => fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`).then((res) => res.json())
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery(['projects', page], () => fetchProjects(page), { keepPreviousData : true })
    

  //const Nextpage =(page) => {    
  //  const { data: error, isLoading, isError } = useQuery(["pages", { id: page }],getMoviePages);
  //}

  const btnClick = (event) => {
    let currentpage = page;
    currentpage = currentpage +1 ;
    setPage(currentpage);   
   }

  //Pagination---------------------------------------

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

  console.log(data)
  console.log(page)
  console.log("setPage")
  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

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
      />
    _________________________________
      <span>Current Page: {page}</span>
       <button
         onClick={() => setPage(old => Math.max(old - 1, 0))}
         disabled={page === 1}
       >
         Previous Page
       </button>{' '}
       <button
         onClick={() => setPage(old => Math.max(old + 1, 0))}
         
         // Disable the Next Page button until we know a next page is available
         //disabled={isPreviousData || !data?.hasMore}
       >
         Next Page
       </button>
       {isFetching ? <span> Loading...</span> : null}{' '}
    </>
  );
};

export default HomePage;