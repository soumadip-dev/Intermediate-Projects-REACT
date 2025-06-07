import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { DropableSection, Card } from './components/atoms/DropableSection';
import { DndContext, rectIntersection } from '@dnd-kit/core';
import InsertTask from './components/atoms/InsertTask';

const App = () => {
  const [todoItems, setTodoItems] = useState<Card[]>([
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
    { id: '3', title: 'Task 3' },
  ]);

  const [inProgressItems, setInProgressItems] = useState<Card[]>([
    { id: '4', title: 'Task 4' },
    { id: '5', title: 'Task 5' },
    { id: '6', title: 'Task 6' },
  ]);

  const [doneItems, setDoneItems] = useState<Card[]>([
    { id: '7', title: 'Task 7' },
    { id: '8', title: 'Task 8' },
    { id: '9', title: 'Task 9' },
  ]);

  const addToSection = (section: string, card: Card) => {
    switch (section) {
      case 'Todo':
        setTodoItems([...todoItems, card]);
        break;
      case 'In Progress':
        setInProgressItems([...inProgressItems, card]);
        break;
      case 'Done':
        setDoneItems([...doneItems, card]);
        break;
      default:
        break;
    }
  };

  const removeFromSection = (section: string, cardId: string | number) => {
    switch (section) {
      case 'Todo':
        setTodoItems(todoItems.filter(card => card.id !== cardId));
        break;
      case 'In Progress':
        setInProgressItems(inProgressItems.filter(card => card.id !== cardId));
        break;
      case 'Done':
        setDoneItems(doneItems.filter(card => card.id !== cardId));
        break;
      default:
        break;
    }
  };

  function onAddtask(title: string, section: string, id: string) {
    addToSection(section, { id, title });
  }


  return (
    <DndContext
      onDragEnd={e => {
        const currentSection = e?.over?.id || '';
        const cardId = e?.active?.data?.current?.id;
        const cardTitle = e?.active?.data?.current?.title;
        const prevSection = e?.active?.data?.current?.section;

        if (currentSection !== prevSection) {
          removeFromSection(prevSection, cardId);
          addToSection(currentSection.toString(), { id: cardId, title: cardTitle });
        }
      }}
      collisionDetection={rectIntersection}
    >
      <Flex direction="row" minH="100vh" bg="gray.50" p={6} gap={6}>
        <Flex
          flex={0.9}
          gap={6}
          overflowX="auto"
          pb={4}
          css={{
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'teal.300',
              borderRadius: '4px',
            },
          }}
        >
          <DropableSection title="Todo" items={todoItems} />
          <DropableSection title="In Progress" items={inProgressItems} />
          <DropableSection title="Done" items={doneItems} />
        </Flex>
        <Flex justifyContent={'center'} alignItems={'center'} marginLeft={-50}>
          <InsertTask onAddTask={onAddtask} />
        </Flex>
      </Flex>
    </DndContext>
  );
};

export default App;
