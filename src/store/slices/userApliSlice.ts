import { USERS_URL } from "@/config/constants";
import { UserType } from "@/types/user";

import { apiSlice } from "./apiSlice";

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
