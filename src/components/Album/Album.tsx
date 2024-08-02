"use client";

import { useGetPhotosByAlbumIdQuery } from "@/store/slices/photosApiSlice";
import { FC } from "react";
import Loader from "../common/Loader/Loader";
import { Card, CardBody, Heading, Image, Text, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

type AlbumProps = {
  userId: number;
  id: number;
  title: string;
};

const Album: FC<AlbumProps> = ({ userId, id, title }) => {
  const router = useRouter();
  const { data, error, isLoading } = useGetPhotosByAlbumIdQuery(id);

  const handleNavigate = () => {
    console.log("navigate to user: ", userId);
    router.push(`/users/${userId}`);
  };

  if (isLoading) {
    return <Loader size={20} />;
  }

  if (!data || error) {
    return <>error goes here</>;
  }

  const { title: photoTitle, thumbnailUrl } = data[0];

  return (
    <Card maxW="sm" onClick={() => handleNavigate()} cursor="pointer">
      <CardBody>
        <Image
          alt={title}
          objectFit="cover"
          src={thumbnailUrl}
          borderRadius={4}
          mx="auto"
        />
        <Stack mt="2">
          <Heading my="2" size="sm">
            {title}
          </Heading>
          <Text my="2" fontSize="small">
            {photoTitle}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};
export default Album;
