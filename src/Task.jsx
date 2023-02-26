import { Card } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ title, id, category }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      category,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card mb="1rem" p="1rem" mx="0.5rem" bg="purple.300">
        {title}
      </Card>
    </div>
  );
}
