import { UserType } from "@/types/user";
import { Box, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

type UserCardProps = {
  user: UserType;
};

const UserCard: FC<UserCardProps> = ({ user }) => {
  const { name, website, company, email, phone } = user;
  const { name: companyName, bs, catchPhrase } = company;

  return (
    <Box mb={4}>
      <Card>
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
  );
};
export default UserCard;
