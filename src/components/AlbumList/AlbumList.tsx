"use client";

import { SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { AlbumType } from "@/types/album";

import Album from "../Album/Album";

type AlbumListProps = {
  albums: AlbumType[];
  userId?: number;
};

const AlbumList: FC<AlbumListProps> = ({ albums }) => {
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
