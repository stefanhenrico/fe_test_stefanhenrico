"use client";

import { FC } from "react";
import { Card, CardBody, Heading, Image, Stack } from "@chakra-ui/react";

type AlbumProps = {
  userId: number;
  title: string;
  thumbnailUrl?: string;
  onClick: (userId: number) => void;
};

const Album: FC<AlbumProps> = ({ userId, title, thumbnailUrl, onClick }) => {
  return (
    <Card maxW="sm" onClick={() => onClick(userId)} cursor="pointer">
      <CardBody>
        <Image
          alt={title}
          objectFit="cover"
          src={thumbnailUrl ? thumbnailUrl.replace("150", "200") : ""}
          borderRadius={4}
          mx="auto"
          sizes="200px"
        />
        <Stack mt="4">
          <Heading size="sm">{title}</Heading>
        </Stack>
      </CardBody>
    </Card>
  );
};
export default Album;
