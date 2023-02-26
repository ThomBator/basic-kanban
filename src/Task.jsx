import { Card, HStack, IconButton, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { DeleteIcon } from "@chakra-ui/icons";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ title, id, category, deleteItem }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      category,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  function handleDelete(event) {
    event.preventDefault();
    deleteItem(title);
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card mb="1rem" p="1rem" mx="0.5rem" bg="purple.300">
        <HStack justifyContent="space-between">
          <Text>{title}</Text>
          <form onSubmit={handleDelete}>
            <IconButton
              type="submit"
              bg="purple.300"
              aria-label="delete item"
              icon={<DeleteIcon />}
            />
          </form>
        </HStack>
      </Card>
    </div>
  );
}
