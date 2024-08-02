"use client";

import AlbumPage from "./album/page";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <ChakraProvider>
      <AlbumPage />
    </ChakraProvider>
  );
};
export default HomePage;
