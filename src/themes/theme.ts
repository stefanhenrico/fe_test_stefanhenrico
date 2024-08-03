import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        margin: "0 16px",
      },
    }),
  },
});

export default theme;
