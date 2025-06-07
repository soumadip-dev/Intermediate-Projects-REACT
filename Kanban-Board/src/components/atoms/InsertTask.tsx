import React, { useState } from 'react';
import { Input, Flex, Text, Button, Box } from '@chakra-ui/react';

interface InsertTaskProps {
  onAddTask: (title: string, section: string, id: string) => void;
}

const InsertTask: React.FC<InsertTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState<string>('');
  const [section, setSection] = useState<string>('');

  const handleAdd = () => {
    if (!title || !section) return;
    const id = crypto.randomUUID();
    onAddTask(title, section, id);
    setTitle('');
    setSection('');
  };

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.200"
      minW="350px"
      height="fit-content"
    >
      <Text fontSize="xl" fontWeight="bold" color="teal.600" mb={4} textAlign="center">
        Add New Task
      </Text>

      <Flex direction="column" gap={4}>
        <Input
          color={'teal.600'}
          type="text"
          placeholder="Task description..."
          bg="gray.50"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          _focus={{
            borderColor: 'teal.400',
            boxShadow: '0 0 0 1px teal.400',
          }}
          size="lg"
        />

        <Flex position="relative" direction="column">
          <Text fontSize="sm" color="gray.600" mb={1} fontWeight="medium">
            Select section:
          </Text>
          <Input
            color={'teal.600'}
            list="section-options"
            placeholder="Type or select..."
            bg="gray.50"
            value={section}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSection(e.target.value)}
            _focus={{
              borderColor: 'teal.400',
              boxShadow: '0 0 0 1px teal.400',
            }}
            size="lg"
          />
          <datalist id="section-options">
            <option value="Todo" />
            <option value="In Progress" />
            <option value="Done" />
          </datalist>
        </Flex>

        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleAdd}
          _hover={{ transform: 'translateY(-2px)' }}
          _active={{ transform: 'translateY(0)' }}
          transition="all 0.2s"
          backgroundColor={'teal.600'}
          mt={2}
        >
          Add Task
        </Button>
      </Flex>
    </Box>
  );
};

export default InsertTask;
