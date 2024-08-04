"use client";

import {
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import { ChangeEvent, FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || null;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setQuery("");
  };

  const handleOnSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let searchStr = `/search/?query=${query}`;

    const searchUserId = path.includes("users")
      ? path.replace("/users/", "")
      : userId;

    if (searchUserId) {
      searchStr += `&userId=${searchUserId}`;
    }

    router.push(searchStr);
    setQuery("");
  };

  return (
    <Container
      justifyContent="flex-start"
      maxW="100%"
      p={0}
      px={4}
      m={0}
      mt={4}
    >
      <form onSubmit={handleOnSearch}>
        <InputGroup width="100%">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.600" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            value={query}
            width="100%"
            onChange={handleOnChange}
          />
          {query && (
            <InputRightElement onClick={handleClearSearch} cursor="pointer">
              <CloseIcon color="gray.600" />
            </InputRightElement>
          )}
        </InputGroup>
      </form>
    </Container>
  );
};

export default SearchBar;
