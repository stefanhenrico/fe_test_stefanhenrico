"use client";

import {
  Button,
  Container,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container justifyContent="flex-start" maxW="100%" p={0} m={0} mb={4}>
      <form onSubmit={handleSearch}>
        <InputGroup width="100%">
          <Input
            placeholder="Search..."
            value={searchQuery}
            width="100%"
            onChange={handleOnChange}
          />
          <InputRightAddon width="4.5rem">
            <Button size="md" type="submit">
              Search
            </Button>
          </InputRightAddon>
        </InputGroup>
      </form>
    </Container>
  );
};
export default SearchBar;
