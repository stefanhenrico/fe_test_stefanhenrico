"use client";

import AlbumList from "@/components/AlbumList/AlbumList";
import Loader from "@/components/common/Loader/Loader";
import UserCard from "@/components/UserCard/UserCard";
import useAlbumsWithThumbnails from "@/hooks/useAlbumsWithThumbnails";
import { useGetUserDetailsQuery } from "@/store/slices/userApliSlice";
import { Container } from "@chakra-ui/react";
import { FC } from "react";

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

  if (userLoading || albumsLoading || photosLoading) {
    return <Loader />;
  }

  if (!userData || userError || !albums || albumsError || photosError) {
    return <>error goes here</>;
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
