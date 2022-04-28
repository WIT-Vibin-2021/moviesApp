
import React from "react";
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "react-query";
import Sigin from "../components/Login";


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
  title: "Login/Login Web Form",
  component: Sigin,  
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => (<QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>)    
  ],
};

export const Basic = () => {
  return <Sigin onUserInput={action("search input")} />;
};
Basic.storyName = "Default";
