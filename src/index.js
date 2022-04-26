import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link  } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from './pages/upcomingMoviesPage'
import { QueryClientProvider, QueryClient } from "react-query";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import TopRatedMoviesPage from './pages/topRatedMoviesPage'
import MoviesSearchPage from './pages/moviesSearchPage'
import SimilarMovies from './pages/similarMovies'
import MoviesCriteria from './pages/moviesCriteriaSearchPage'

import tvShowsDetailPage from "./pages/tvShowsDetailsPage";
import popularTvShowsPage from './pages/popularTvShowsPage'
import PopularTvShows from "./pages/popularTvShowsPage";
import FantasyMoviePage from "./pages/fantasyMoviePage";
import { ReactQueryDevtools } from 'react-query/devtools'
import 'bootstrap/dist/css/bootstrap.min.css';   

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
        
          <Switch>
          <Route exact path="/fantasymovies/" component={FantasyMoviePage} />
          <Route exact path="/tvshows/popular" component={PopularTvShows} />
          <Route path="/tvshows/:id" component={tvShowsDetailPage} /> 

          <Route path="/searchcriteria/:generid/:lang/:year/:sort" component={MoviesCriteria} />          
          <Route path="/search/:query" component={MoviesSearchPage} />

          <Route path="/similar/:query" component={SimilarMovies} />          
          <Route path="/movies/toprated" component={TopRatedMoviesPage} />
          <Route exact path="/reviews/form" component={AddMovieReviewPage} />
          <Route path="/movies/upcoming" component={UpcomingMoviesPage} />
          <Route path="/reviews/:id" component={MovieReviewPage} />
          <Route exact path="/movies/favourites" component={FavouriteMoviesPage} />
          <Route path="/movies/:id" component={MoviePage} />
          <Route exact path="/" component={HomePage} />
          <Redirect from="*" to="/" />
          </Switch>
      
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));