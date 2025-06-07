import React, { useState } from 'react';
import { Input, Flex, Text, Button } from '@chakra-ui/react';

interface InsertTaskProps {
  onAddTask: (title: string, section: string, id: string) => void;
}

const InsertTask: React.FC<InsertTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState<string>('');
  const [section, setSection] = useState<string>('');

  const handleAdd = () => {
    if (!title || !section) return;
    const id = crypto.randomUUID(); // or use any ID generator
    onAddTask(title, section, id);
    setTitle('');
    setSection('');
  };

  return (
    <Flex
      backgroundColor="gray.800"
      padding={3}
      borderRadius={8}
      margin={2}
      border="1px solid gray.600"
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.2)"
      alignItems="center"
      gap={2}
    >
      <Text fontSize="xl" fontWeight="bold" color="white" flex={1} textAlign="center">
        Add new Task
      </Text>

      <Input
        type="text"
        placeholder="Enter your task..."
        backgroundColor="white"
        color="black"
        flex={2}
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />

      <Input
        list="section-options"
        placeholder="Select section..."
        backgroundColor="white"
        color="black"
        flex={2}
        value={section}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSection(e.target.value)}
      />
      <datalist id="section-options">
        <option value="Todo" />
        <option value="In Progress" />
        <option value="Done" />
      </datalist>

      <Button flex={1} margin={2} backgroundColor="green.600" color="white" onClick={handleAdd}>
        Add
      </Button>
    </Flex>
  );
};

export default InsertTask;
