import type { Metadata } from "next";
import { FC } from "react";
import "@/assets/styles/globals.css";

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
    <html lang="en">
      <body>
        <section>
          <div>{children}</div>
        </section>
      </body>
    </html>
  );
};

export default RootLayout;
