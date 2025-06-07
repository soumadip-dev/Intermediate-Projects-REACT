import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { DropableSection, Card } from './components/atoms/DropableSection';

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

  return (
    <Flex direction="column" minH="100vh" bg="gray.50" p={6}>
      <Flex
        flex={1}
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
            background: '#CBD5E0',
            borderRadius: '4px',
          },
        }}
      >
        <DropableSection title="Todo" items={todoItems} />
        <DropableSection title="In Progress" items={inProgressItems} />
        <DropableSection title="Done" items={doneItems} />
      </Flex>
    </Flex>
  );
};

export default App;
