import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SidebarDrawerProvider } from "../Contexts/SidebarDrawerContext";
import { makeServer } from "../services/mirage";
import { queryClient } from "../services/queryClient";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === "development") {
    makeServer();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
