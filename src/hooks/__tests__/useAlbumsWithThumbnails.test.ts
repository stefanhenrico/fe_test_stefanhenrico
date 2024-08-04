import { renderHook } from "@testing-library/react";
import { useGetAlbumsQuery } from "@/store/slices/albumApiSlice";
import useAlbumsWithThumbnails from "@/hooks/useAlbumsWithThumbnails";
import { AlbumType } from "@/types/album";
import { useGetPhotosQuery } from "@/store/slices/photosApiSlice";

jest.mock("@/store/slices/albumApiSlice");
jest.mock("@/store/slices/photosApiSlice");

describe("useAlbumsWithThumbnails", () => {
  const mockAlbumsData: AlbumType[] = [
    { id: 1, title: "Album 1", userId: 1 },
    { id: 2, title: "Album 2", userId: 1 },
  ];

  const mockPhotosData = [
    { id: 1, albumId: 1, thumbnailUrl: "url1" },
    { id: 2, albumId: 2, thumbnailUrl: "url2" },
  ];

  beforeEach(() => {
    (useGetAlbumsQuery as jest.Mock).mockReturnValue({
      data: mockAlbumsData,
      error: null,
      isLoading: false,
    });

    (useGetPhotosQuery as jest.Mock).mockReturnValue({
      data: mockPhotosData,
      error: null,
      isLoading: false,
    });
  });

  it("should return albums with thumbnails", () => {
    const { result } = renderHook(() => useAlbumsWithThumbnails());

    expect(result.current.albums).toEqual([
      { ...mockAlbumsData[0], thumbnailUrl: "url1" },
      { ...mockAlbumsData[1], thumbnailUrl: "url2" },
    ]);
  });

  it("should handle loading state", () => {
    (useGetAlbumsQuery as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: true,
    });

    const { result } = renderHook(() => useAlbumsWithThumbnails());

    expect(result.current.albumsLoading).toBe(true);
  });

  it("should handle error state", () => {
    (useGetAlbumsQuery as jest.Mock).mockReturnValue({
      data: [],
      error: "Error fetching albums",
      isLoading: false,
    });

    const { result } = renderHook(() => useAlbumsWithThumbnails());

    expect(result.current.albumsError).toBe("Error fetching albums");
  });
});
