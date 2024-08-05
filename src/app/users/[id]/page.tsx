"use client";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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

  const handleBack = () => {
    router.back();
  };

  return (
    <Container maxW="100%" p={4}>
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={handleBack}
        colorScheme="gray"
        variant="solid"
        mb={4}
      >
        Back
      </Button>
      <UserCard user={userData} />
      <AlbumList albums={userAlbums} />
    </Container>
  );
};
export default UserPage;
