import React from "react";
import TvShowsDetails from "../components/tvShowsDetails";
import SampleTvShows from "./sampleTvShowsData";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "TV Shows Details Page/TVShowsDetails",
  component: TvShowsDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,    
  ],
};

export const Basic = () => <TvShowsDetails tvshows={SampleTvShows} />;
Basic.storyName = "Default";