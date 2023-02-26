import { Card, Container, Heading } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";

export default function Lane({ id, tasks, title }) {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
      <Container
        minH={{ base: "4rem", lg: "30rem" }}
        p="1rem"
        rounded="md"
        bg="gray.50"
        ref={setNodeRef}
      >
        <Heading fontSize="2xl" fontWeight="500" textAlign="center" mb="2rem">
          {title}
        </Heading>
        {tasks.map((task, index) => (
          <Task key={index} id={task.title} title={task.title} category={id} />
        ))}
      </Container>
    </SortableContext>
  );
}
