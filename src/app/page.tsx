"use client";

import { Container } from "@chakra-ui/react";

import AlbumList from "@/components/AlbumList/AlbumList";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";
import Loader from "@/components/common/Loader/Loader";
import useAlbumsWithThumbnails from "@/hooks/useAlbumsWithThumbnails";

const HomePage = () => {
  const { albums, albumsError, albumsLoading, photosError, photosLoading } =
    useAlbumsWithThumbnails();
  const isLoading = albumsLoading || photosLoading;
  const isError = !albums || albumsError || photosError;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Container maxW="100%" p={4}>
      <AlbumList albums={albums} />
    </Container>
  );
};
export default HomePage;
