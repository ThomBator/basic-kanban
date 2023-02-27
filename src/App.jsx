import { useState, useEffect } from "react";
import { DndContext, rectIntersection, closestCenter } from "@dnd-kit/core";
import {
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
//Components
import Lane from "./Lane";
import AddItem from "./AddItem";

//I know this isn't the best way do to this, but thought it would be fine given the project timeline.
//Dummy data has id's 1-6 so these will start at 7. I would probably use DB ids in a real implementation.
let newId = 7;

function App() {
  //List of all tasks will be sorted in to each Kanban lane

  const [allItems, setAllItems] = useState([]);
  //Kanban lanes will recieve filtered lists from useEffect below
  const [laneOneItems, setLaneOneItems] = useState([]);
  const [laneTwoItems, setLaneTwoItems] = useState([]);
  const [laneThreeItems, setLaneThreeItems] = useState([]);

  //Get data from JSON file
  async function getItems() {
    try {
      const response = await import("./data/tasks");

      setAllItems(response.default);
    } catch (error) {
      console.error(error);
    }
  }

  //This function compares the category property from the individual tasks to the Kanban Lane Ids
  //The indivdual task that was dragged will then have its lineId property to the new lane
  //This triggers useEffect when allItems is updated, which will lead to the lanes being re-sorted.
  function handleDragEnd(event) {
    console.log(event);
    const { active, over } = event;
    const laneID = active.data.current.category;
    if (laneID !== over.id) {
      setAllItems(
        allItems.map((item) => {
          if (item.id === active.id) {
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
    //It is helpful to trim the input value to ensure that empty values cannot be added.
    const title = unTrimmedTitle.trim();

    if (title) {
      const newItem = { id: newId, listId: 1, title };
      newId += 1;
      setAllItems([newItem, ...allItems]);
    }
  }

  function deleteItem(id) {
    setAllItems(() => allItems.filter((item) => item.id !== id));
  }

  //First useEffect only fires on mount to get dummy data from JSON file
  useEffect(() => {
    getItems();
  }, []);

  //Second useEffect fires everytime allItems list changes, to filter lane lists.
  useEffect(() => {
    setLaneOneItems(() => allItems.filter((item) => item.listId === 1));
    setLaneTwoItems(() => allItems.filter((item) => item.listId === 2));
    setLaneThreeItems(() => allItems.filter((item) => item.listId === 3));
  }, [allItems]);

  return (
    <Box>
      <Box
        borderTop="1px"
        borderBottom="1px"
        mt="3rem"
        mx={{ base: "2%", lg: "15%" }}
        mb="2rem"
      >
        <Heading
          fontSize="7xl"
          letterSpacing="0.1rem"
          textAlign="center"
          fontWeight="500"
          pt="3rem"
        >
          Stellar Kanban Board
        </Heading>
        <Text
          textAlign="center"
          fontWeight="500"
          fontSize="lg"
          mx="auto"
          mt="1rem"
          mb="2rem"
          maxW="72%"
        >
          Welcome to Stellar Kanban Board! Drag items to "In Progress" and
          "Done" as you make progress. You can add new items using the form
          below the Kanban Lanes. Click on the trash can to delete any items.
        </Text>
      </Box>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          bg="#fcd307"
          spacing="2rem"
          py="5rem"
          px={{ base: "5%", lg: "15%" }}
          justifyContent="center"
          alignItems="center"
          minH="30rem"
          mx={{ base: "2%", lg: "15%" }}
          shadow="xl"
        >
          <Lane
            laneId={1}
            title="To Do"
            tasks={laneOneItems}
            deleteItem={deleteItem}
          />
          <Lane
            laneId={2}
            title="In Progress"
            tasks={laneTwoItems}
            deleteItem={deleteItem}
          />
          <Lane
            laneId={3}
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
