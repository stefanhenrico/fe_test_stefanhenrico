"use client";

import Album from "@/components/Album/Album";
import Loader from "@/components/common/Loader/Loader";
import useAlbumsWithThumbnails from "@/hooks/useAlbumsWithThumbnails";
import { useGetUserDetailsQuery } from "@/store/slices/userApliSlice";
import { AlbumType } from "@/types/album";
import {
  Box,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

const UserPage = ({ params }: { params: { id: string } }) => {
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

  const { name, website, company, email, phone } = userData;
  const { name: companyName, bs, catchPhrase } = company;
  const userAlbums = albums.filter((album) => album.userId === userData.id);

  return (
    <>
      <Box>
        <Card boxShadow="none">
          <CardBody>
            <Heading size="lg">{name}</Heading>

            <Text fontSize="sm">{email}</Text>
            <Text fontSize="sm">{phone}</Text>
            <Text fontSize="sm">{website}</Text>

            <Heading size="xs" mt={4} textTransform="uppercase">
              Company details:
            </Heading>
            <Heading size="md">{companyName}</Heading>
            <Text fontSize="sm">- {catchPhrase}</Text>
            <Text fontSize="sm">- {bs}</Text>
          </CardBody>
        </Card>
      </Box>
      <SimpleGrid minChildWidth="200px" spacing="40px">
        {userAlbums.map((item: AlbumType) => {
          return <Album key={item.id} {...item} />;
        })}
      </SimpleGrid>
    </>
  );
};
export default UserPage;
