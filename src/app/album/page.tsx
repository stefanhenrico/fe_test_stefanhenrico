"use client";
import Masonry from "react-responsive-masonry";

import { useGetAlbumsQuery } from "@/store/slices/albumApiSlice";
import { AlbumType } from "@/types/album";
import Loader from "@/components/common/Loader/Loader";
import Album from "@/components/Album/Album";
import { SimpleGrid } from "@chakra-ui/react";

const AlbumPage = () => {
  const { data = [], error, isLoading } = useGetAlbumsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <>error goes here</>;
  }

  return (
    <SimpleGrid minChildWidth="300px" spacing="40px">
      {data.slice(0, 10).map((item: AlbumType) => {
        return <Album key={item.id} {...item} />;
      })}
    </SimpleGrid>
  );
};

export default AlbumPage;
