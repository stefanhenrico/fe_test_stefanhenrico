"use client";

import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  HStack,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

import AlbumList from "@/components/AlbumList/AlbumList";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";
import Loader from "@/components/common/Loader/Loader";
import useAlbumsWithThumbnails from "@/hooks/useAlbumsWithThumbnails";
import { AlbumType } from "@/types/album";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { albums, albumsError, albumsLoading, photosError, photosLoading } =
    useAlbumsWithThumbnails();

  const searchQuery = searchParams.get("query") || "";
  const userId = searchParams.get("userId") || null;

  const isLoading = albumsLoading || photosLoading;
  const isError = !albums || albumsError || photosError;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  const filteredAlbums = albums
    .filter((album: AlbumType) =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((album: AlbumType) =>
      userId ? album.userId === parseInt(userId) : true
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
      <HStack spacing={1} mb={4}>
        <Heading size="md">{filteredAlbums.length} Result(s):</Heading>
        <Tag size={"lg"} borderRadius="full" variant="solid" colorScheme="gray">
          <TagLabel>{searchQuery}</TagLabel>
        </Tag>
      </HStack>
      <AlbumList albums={filteredAlbums} />
    </Container>
  );
};
export default SearchPage;
