"use client";

import { AlbumType } from "@/types/album";
import { SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import Album from "../Album/Album";
import { useRouter } from "next/navigation";

type AlbumListProps = {
  albums: AlbumType[];
  userId?: number;
};

const AlbumList: FC<AlbumListProps> = ({ albums, userId = null }) => {
  const router = useRouter();

  const handleAlbumClick = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  return (
    <SimpleGrid minChildWidth="200px" spacing="40px">
      {albums.map((album: AlbumType) => (
        <Album
          key={album.id}
          {...album}
          onClick={() => handleAlbumClick(album.userId)}
        />
      ))}
    </SimpleGrid>
  );
};

export default AlbumList;
