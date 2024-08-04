"use client";

import Loader from "@/components/common/Loader/Loader";
import { Container } from "@chakra-ui/react";
import useAlbumsWithThumbnails from "@/hooks/useAlbumsWithThumbnails";
import AlbumList from "@/components/AlbumList/AlbumList";

const HomePage = () => {
  const { albums, albumsError, albumsLoading, photosError, photosLoading } =
    useAlbumsWithThumbnails();

  if (albumsLoading || photosLoading) {
    return <Loader />;
  }

  if (!albums || albumsError || photosError) {
    return <>error goes here</>;
  }

  return (
    <Container maxW="100%" p={4}>
      <AlbumList albums={albums} />
    </Container>
  );
};
export default HomePage;
