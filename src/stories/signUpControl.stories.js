import React from "react";
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "react-query";
import SigUp from "../components/SignUp";


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
  title: "Sign Up/Sign Up Web Form",
  component: SigUp,  
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => (<QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>)    
  ],
};

export const Basic = () => {
  return <SigUp onUserInput={action("search input")} />;
};
Basic.storyName = "Default";
