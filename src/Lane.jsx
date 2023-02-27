import { Card, Container, Heading } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";

export default function Lane({ laneId, tasks, title, deleteItem }) {
  //By setting the id property here and passing setNodeRef to the container below
  //It is possible to compare the id of this droppable element to the categories of the tasks being dragged onto it.

  const { setNodeRef } = useDroppable({
    id: laneId,
  });
  return (
    <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
      <Container
        minH={{ base: "4rem", lg: "30rem" }}
        p="1rem"
        rounded="md"
        bg="white"
        ref={setNodeRef}
        border="1px"
        borderColor="gray.200"
        shadow="lg"
      >
        <Heading fontSize="2xl" fontWeight="500" textAlign="center" mb="2rem">
          {title}
        </Heading>
        {tasks.map((task, index) => (
          <Task
            key={index}
            id={task.id}
            title={task.title}
            category={laneId}
            deleteItem={deleteItem}
          />
        ))}
      </Container>
    </SortableContext>
  );
}
