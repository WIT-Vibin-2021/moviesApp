
import React from "react";
import SearchMoviesCriteria from "../components/moviesearchcriteria"
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "react-query";

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
  title: "Filter & Search/SearchMoviesCriteria",
  component: SearchMoviesCriteria,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
};

export const Basic = () => {
  return <SearchMoviesCriteria onUserInput={action("search input")} />;
};
Basic.storyName = "Default";
