"use client";

import { Container } from "@chakra-ui/react";
import { FC } from "react";

import AlbumList from "@/components/AlbumList/AlbumList";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";
import Loader from "@/components/common/Loader/Loader";
import UserCard from "@/components/UserCard/UserCard";
import useAlbumsWithThumbnails from "@/hooks/useAlbumsWithThumbnails";
import { useGetUserDetailsQuery } from "@/store/slices/userApliSlice";

type UserPageProps = {
  params: {
    id: string;
  };
};

const UserPage: FC<UserPageProps> = ({ params }) => {
  const { id: userId } = params;

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetUserDetailsQuery(userId);

  const { albums, albumsError, albumsLoading, photosError, photosLoading } =
    useAlbumsWithThumbnails();

  const isLoading = userLoading || albumsLoading || photosLoading;
  const isError =
    !userData || userError || !albums || albumsError || photosError;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  const userAlbums = albums.filter(
    (album) => album.userId === parseInt(userId)
  );

  return (
    <Container maxW="100%" p={4}>
      <UserCard user={userData} />
      <AlbumList albums={userAlbums} />
    </Container>
  );
};
export default UserPage;
