"use client";

import Album from "@/components/Album/Album";
import Loader from "@/components/common/Loader/Loader";
import {
  useGetUserAlbumsQuery,
  useGetUserDetailsQuery,
} from "@/store/slices/userApliSlice";
import { AlbumType } from "@/types/album";
import {
  Card,
  CardBody,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

const UserPage = ({ params }: { params: { id: string } }) => {
  const { id: userId } = params;
  const { data, error, isLoading } = useGetUserDetailsQuery(userId);

  const {
    data: albumsData,
    error: albumsError,
    isLoading: albumsIsLoading,
  } = useGetUserAlbumsQuery(userId);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <>error goes here</>;
  }

  const { name, website, company, email, phone } = data;
  const { name: companyName, bs, catchPhrase } = company;

  return (
    <SimpleGrid minChildWidth="300px" spacing="40px">
      <Card>
        <CardBody>
          <Heading size="lg">{name}</Heading>
          <Heading size="md">{companyName}</Heading>
          <Text fontSize="md">{website}</Text>
          <Text fontSize="md">{bs}</Text>
          <Text fontSize="md">{catchPhrase}</Text>
          <Text fontSize="md">{email}</Text>
          <Text fontSize="md">{phone}</Text>
        </CardBody>
      </Card>
      {albumsData &&
        albumsData.map((item: AlbumType) => {
          return <Album key={item.id} {...item} />;
        })}
    </SimpleGrid>
  );
};
export default UserPage;
