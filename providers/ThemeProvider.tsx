"use client";

import theme from "@/themes/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

export default ThemeProvider;
