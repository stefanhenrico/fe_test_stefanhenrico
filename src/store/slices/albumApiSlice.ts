import { ALBUMS_URL } from "@/config/constants";
import { AlbumType } from "@/types/album";

import { apiSlice } from "./apiSlice";

export const albumsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAlbums: builder.query<AlbumType[], void>({
      query: () => ({
        url: ALBUMS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAlbumsQuery } = albumsApiSlice;
