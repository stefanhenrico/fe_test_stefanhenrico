import type { Metadata } from "next";
import { FC } from "react";
import StoreProvider from "../../providers/StoreProvider";
import ThemeProvider from "../../providers/ThemeProvider";
import SearchBar from "@/components/SearchBar/SearchBar";
import Navbar from "@/components/NavBar/NavBar";

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
          <ThemeProvider>
            <Navbar />
            <SearchBar />
            <section>
              <div>{children}</div>
            </section>
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
