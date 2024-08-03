"use client";

import Loader from "@/components/common/Loader/Loader";
import { SimpleGrid, Container } from "@chakra-ui/react";
import { AlbumType } from "@/types/album";
import Album from "@/components/Album/Album";
import useAlbumsWithThumbnails from "@/hooks/useAlbumsWithThumbnails";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [searchableAlbums, setSearchableAlbums] = useState<AlbumType[]>([]);
  const { albums, albumsError, albumsLoading, photosError, photosLoading } =
    useAlbumsWithThumbnails();

  useEffect(() => {
    if (albums) {
      setSearchableAlbums(albums);
    }
  }, [albums]);

  if (albumsLoading || photosLoading) {
    return <Loader />;
  }

  if (!albums || albumsError || photosError) {
    return <>error goes here</>;
  }

  const handleNavigateToUserPage = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  const handleSearch = (query: string) => {
    if (query) {
      const filteredAlbums = albums.filter((album) =>
        album.title.toLowerCase().includes(query.toLowerCase())
      );

      setSearchableAlbums(filteredAlbums);
    } else {
      setSearchableAlbums(albums);
    }
  };

  return (
    <Container maxW="100%" p={4}>
      <SearchBar onSearch={handleSearch} />
      <SimpleGrid minChildWidth="200px" spacing="40px">
        {searchableAlbums.map((item: AlbumType) => (
          <Album
            key={item.id}
            {...item}
            onClick={() => handleNavigateToUserPage(item.userId)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};
export default HomePage;
