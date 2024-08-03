"use client";

import { useGetAlbumsQuery } from "@/store/slices/albumApiSlice";
import { useGetPhotosQuery } from "@/store/slices/photosApiSlice";
import { AlbumType } from "@/types/album";
import { useEffect, useState } from "react";

const useAlbumsWithThumbnails = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);

  const {
    data: albumsData = [],
    error: albumsError,
    isLoading: albumsLoading,
  } = useGetAlbumsQuery();

  const {
    data: photosData = [],
    error: photosError,
    isLoading: photosLoading,
  } = useGetPhotosQuery();

  useEffect(() => {
    if (albumsData.length > 0 && photosData.length > 0) {
      const albums = albumsData.map((album: AlbumType) => {
        const photos = photosData.filter((photo) => photo.albumId === album.id);
        return {
          ...album,
          thumbnailUrl: photos[0].thumbnailUrl ?? "",
        };
      });
      setAlbums(albums);
    }
  }, [albumsData, photosData]);

  return { albums, albumsLoading, albumsError, photosLoading, photosError };
};

export default useAlbumsWithThumbnails;
