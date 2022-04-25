import React from "react";
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router-dom";
import MoviesContextProvider from "../contexts/moviesContext";
import { action } from "@storybook/addon-actions";

export default {
  title: "Movie Page/MovieCard",
  component: MovieCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],  
};

export const Basic = () => {
  return (
    <MovieCard
      movie={SampleMovie}
      action={action}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleMovie, poster_path: undefined };
  return (
    <MovieCard
      movie={sampleNoPoster}
      action={action}
    />
  );
};
Exceptional.storyName = "exception";