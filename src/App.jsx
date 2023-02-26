import { useState, useEffect } from "react";
import { DndContext, rectIntersection, closestCenter } from "@dnd-kit/core";
import { Box, Container, Flex, Heading, Spacer, Stack } from "@chakra-ui/react";
//Components
import Lane from "./Lane";
import AddItem from "./AddItem";

const itemsList = [
  { listId: 1, title: "Build kaban board" },
  { listId: 2, title: "Make droppable component" },
  { listId: 3, title: "Make draggable component" },
  { listId: 1, title: "Use dnd-kit library" },
  { listId: 2, title: "Use Charka-ui libary" },
  { listId: 3, title: "Use vite as build tool" },
];

function App() {
  const [allItems, setAllItems] = useState(itemsList);
  const [laneOneItems, setLaneOneItems] = useState([]);
  const [laneTwoItems, setLaneTwoItems] = useState([]);
  const [laneThreeItems, setLaneThreeItems] = useState([]);

  function handleDragEnd(event) {
    console.log(event);
    const { active, over } = event;
    const laneID = active.data.current.category;
    if (laneID !== over.id) {
      setAllItems(
        allItems.map((item) => {
          if (item.title === active.id) {
            item.listId = over.id;
            return item;
          } else {
            return item;
          }
        })
      );
    }
  }

  function addItem(unTrimmedTitle) {
    const title = unTrimmedTitle.trim();

    if (title) {
      const newItem = { listId: 1, title };
      setAllItems([newItem, ...allItems]);
    }
  }

  function deleteItem(titleToDelete) {
    setAllItems(() => allItems.filter((item) => item.title !== titleToDelete));
  }

  useEffect(() => {
    setLaneOneItems(() => allItems.filter((item) => item.listId === 1));
    setLaneTwoItems(() => allItems.filter((item) => item.listId === 2));
    setLaneThreeItems(() => allItems.filter((item) => item.listId === 3));
  }, [allItems]);

  return (
    <Box>
      <Heading
        fontSize="7xl"
        letterSpacing="0.1rem"
        textAlign="center"
        fontWeight="500"
        my="3rem"
        bg="white"
      >
        Stellar Kanban Board
      </Heading>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          bg="yellow.300"
          spacing="2rem"
          py="5rem"
          px="10rem"
          justifyContent="center"
          alignItems="center"
          minH="30rem"
        >
          <Lane
            id={1}
            title="To Do"
            tasks={laneOneItems}
            deleteItem={deleteItem}
          />
          <Lane
            id={2}
            title="In Progress"
            tasks={laneTwoItems}
            deleteItem={deleteItem}
          />
          <Lane
            id={3}
            title="Done"
            tasks={laneThreeItems}
            deleteItem={deleteItem}
          />
        </Stack>
      </DndContext>
      <AddItem addItem={addItem} />
    </Box>
  );

  const [items, setItems] = useState();
}

export default App;
