/* eslint-disable react/no-unescaped-entities */
import { Container, Text } from "@chakra-ui/react";

const ErrorMessage = () => {
  return (
    <Container maxW="100%" p={4}>
      <Text>The albums couldn't be retrieved. Please try again later.</Text>
    </Container>
  );
};
export default ErrorMessage;
