import { ALBUMS_URL, PHOTOS_URL } from "@/config/constants";
import { apiSlice } from "./apiSlice";
import { PhotoType } from "@/types/photo";

export const photosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPhotosByAlbumId: builder.query<PhotoType[], number>({
      query: (albumId: number) => ({
        url: `${ALBUMS_URL}/${albumId}${PHOTOS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetPhotosByAlbumIdQuery } = photosApiSlice;
