import { ALBUMS_URL, USERS_URL } from "@/config/constants";
import { apiSlice } from "./apiSlice";
import { UserType } from "@/types/user";
import { AlbumType } from "@/types/album";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserType, string>({
      query: (userId: string) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUserDetailsQuery } = usersApiSlice;
