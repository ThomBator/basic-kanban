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
  }

  return (
    <VStack bg="gray.100" textAlign="center" py="2rem" minH="15rem" maxH="100%">
      <Heading as="h3" fontSize="2xl" fontWeight="500">
        Add an Item
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl
          px="1rem"
          onChange={(e) => setTitle(e.target.value)}
          as="textarea"
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
