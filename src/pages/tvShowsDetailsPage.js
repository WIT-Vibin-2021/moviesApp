import React from "react";
import { useParams } from "react-router-dom";
import TvShowsDetails from "../components/tvShowsDetails";
import PageTemplate from "../components/templateTvShowsPage";
import { getTvShowsDetails } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'



const TvShowsDetailsPage = (props) => {
  const { id } = useParams();

  const { data: tvshows, error, isLoading, isError } = useQuery(["tvshows", { id: id }],getTvShowsDetails);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {tvshows ? (
        <>
          <PageTemplate tvshows={tvshows}>
            <TvShowsDetails tvshows={tvshows} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for Tv show details</p>
      )}
    </>
  );
};

export default TvShowsDetailsPage;