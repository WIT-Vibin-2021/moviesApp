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
import NowPlayingMoviesPage from './pages/nowPlayingMoviesPage'
import TrendingMoviesPage from './pages/trendingMoviesPage'
import MoviesSearchPage from './pages/moviesSearchPage'
import SimilarMovies from './pages/similarMovies'
import RecommendedMovies from './pages/recommendedMovies'
import MoviesCriteria from './pages/moviesCriteriaSearchPage'

import tvShowsDetailPage from "./pages/tvShowsDetailsPage";
import loginPage from './pages/loginPage'
import PopularTvShows from "./pages/popularTvShowsPage";
import FantasyMoviePage from "./pages/fantasyMoviePage";
import { ReactQueryDevtools } from 'react-query/devtools'
import 'bootstrap/dist/css/bootstrap.min.css';   
import AuthContextProvider from "./contexts/authContext";
import PrivateRoute from './components/privateRoute';
import PublicRoute from './components/publicRoute';
import AddToFavouritesIcon from "./components/cardIcons/addToFavourites";

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
        <AuthContextProvider>
        <SiteHeader />        
          <MoviesContextProvider>          
            <Switch>
            <PublicRoute restricted={true} exact path="/login/" component={loginPage} />
            <PrivateRoute exact path="/fantasymovies/" component={FantasyMoviePage} />
            <Route exact path="/tvshows/popular" component={PopularTvShows} />
            <Route path="/tvshows/:id" component={tvShowsDetailPage} /> 

            <Route path="/searchcriteria/:generid/:lang/:year/:sort" component={MoviesCriteria} />          
            <PublicRoute restricted={true} path="/search/:query" component={MoviesSearchPage} />

            <Route path="/recommended/:query" component={RecommendedMovies} />
            <Route path="/similar/:query" component={SimilarMovies} />
            <Route path="/movies/trending" component={TrendingMoviesPage} />    
            <Route path="/movies/nowplaying" component={NowPlayingMoviesPage} />    
            <Route path="/movies/toprated" component={TopRatedMoviesPage} />
            <Route exact path="/reviews/form" component={AddMovieReviewPage} />
            <Route path="/movies/upcoming" component={UpcomingMoviesPage} />
            <Route path="/reviews/:id" component={MovieReviewPage} />
            <PrivateRoute exact path="/movies/favourites" component={FavouriteMoviesPage} />
            <Route path="/movies/:id" component={MoviePage} />
            <Route exact path="/" component={HomePage} />
            <Redirect from="*" to="/" />
            </Switch>
        
          </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));