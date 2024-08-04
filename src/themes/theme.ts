import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        margin: "0",
        padding: "0",
      },
      // a: {
      //   _hover: {
      //     cursor: "pointer",
      //   },
      // },
    }),
  },
});

export default theme;
