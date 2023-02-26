import { Card, HStack, IconButton, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { DeleteIcon } from "@chakra-ui/icons";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ title, id, category, deleteItem }) {
  //The title is used as an id to indicate each individual task
  //In a true production environment it would be better to assign a unique numeric id to each task
  //I would probably do this using database ids, seemed uncessary to set up that way here but thought I'd mention.
  //Category is also passed to compare the current lane the item is in to the lanes it may be dragged over.
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
      <Card mb="1rem" p="1rem" mx="0.5rem" bg="#ededed">
        <HStack justifyContent="space-between">
          <Text>{title}</Text>
          <form onSubmit={handleDelete}>
            <IconButton
              type="submit"
              bg="#ededed"
              aria-label="delete item"
              icon={<DeleteIcon />}
            />
          </form>
        </HStack>
      </Card>
    </div>
  );
}
