
import React from "react";
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "react-query";
import FantasyMovies from "../components/fantasyMovieForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});
export default {
  title: "Fantasy Movies/Fantasy Movies Web Form",
  component: FantasyMovies,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
};

export const Basic = () => {
  return <FantasyMovies onUserInput={action("search input")} />;
};
Basic.storyName = "Default";
