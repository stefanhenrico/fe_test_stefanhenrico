"use client";

import store from "@/store/store";
import AlbumPage from "./album/page";
import { Provider } from "react-redux";

const HomePage = () => {
  return (
    <Provider store={store}>
      <AlbumPage />
    </Provider>
  );
};
export default HomePage;
