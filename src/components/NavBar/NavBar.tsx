import { Flex, Container } from "@chakra-ui/react";
import Link from "next/link";

const NavBar = () => {
  return (
    <Container justifyContent="flex-start" maxW="100%" m={0} p={0}>
      <Flex
        h={12}
        p={4}
        py={4}
        alignItems={"center"}
        justifyContent={"space-between"}
        bg={"gray.200"}
        fontWeight={"bold"}
      >
        <Link href="/">Home</Link>
      </Flex>
    </Container>
  );
};

export default NavBar;
