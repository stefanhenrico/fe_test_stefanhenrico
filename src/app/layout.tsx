import type { Metadata } from "next";
import { FC } from "react";
import "@/assets/styles/globals.css";
import StoreProvider from "../../providers/StoreProvider";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Albums",
  description: "A technical assessment for cars.co.za",
  keywords: ["albums", "photos", "cars"],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <ChakraProvider>
            <section>
              <div>{children}</div>
            </section>
          </ChakraProvider>
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
