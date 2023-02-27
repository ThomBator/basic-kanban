import { useState } from "react";

import {
  FormControl,
  Container,
  Heading,
  Button,
  VStack,
} from "@chakra-ui/react";

function AddItem({ addItem }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    addItem(title);
    setTitle("");
  }

  return (
    <VStack
      bg="gray.100"
      mx={{ base: "2%", lg: "15%" }}
      mt="2rem"
      mb="2rem"
      textAlign="center"
      py="2rem"
      minH="15rem"
      maxH="100%"
      shadow="xl"
    >
      <Heading as="h3" fontSize="2xl" fontWeight="500">
        Add an Item
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl
          p="1rem"
          mt="0.5rem"
          mb="2rem"
          onChange={(e) => setTitle(e.target.value)}
          as="input"
          name="title"
          value={title}
        />
        <Button type="submit" colorScheme="purple">
          Submit
        </Button>
      </form>
    </VStack>
  );
}

export default AddItem;
