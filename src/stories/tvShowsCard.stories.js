import React from "react";
import TvShowsCard from "../components/tvShowsCard";
import SampleTvShows from "./sampleTvShowsData";
import { MemoryRouter } from "react-router-dom";
import { action } from "@storybook/addon-actions";

export default {
  title: "Tv Shows Page/TVShowsCard",
  component: TvShowsCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,    
  ],  
};

export const Basic = () => {
  return (
    <TvShowsCard
      tvshows={SampleTvShows}
      action={action}
    />
  ); 
};
Basic.storyName = "Card";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleTvShows, poster_path: undefined };
  return (
    <TvShowsCard
      tvshows={sampleNoPoster}
      action={action}
    />
  );
};
Exceptional.storyName = "exception";