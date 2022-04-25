import React from "react";
import TvShowsHeader from "../components/headerTvShows";
import SampleTvShows from "./sampleTvShowsData";
import { MemoryRouter } from "react-router";

export default {
  title: "TV Shows Details Page/TvShowsHeader",
  component: TvShowsHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],  
};

export const Basic = () => <TvShowsHeader tvshows={SampleTvShows} />;
Basic.storyName = "Default";