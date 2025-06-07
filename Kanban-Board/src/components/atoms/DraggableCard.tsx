import React, { useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableCardProps {
  title: string;
  id: string | number;
  section: string;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ title, id, section }) => {
  const { isDragging, setNodeRef, listeners, attributes } = useDraggable({
    id: id,
    data: {
      title: title,
      section: section,
      id: id,
    },
  });

  useEffect(() => {
    console.log('Dragging:', isDragging);
  }, [isDragging]);

  return (
    <Flex
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      direction="column"
      p={3}
      borderRadius="md"
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow={isDragging ? 'xl' : 'sm'}
      cursor="grab"
      opacity={isDragging ? 0.8 : 1}
      transform={isDragging ? 'scale(1.02)' : 'scale(1)'}
      _active={{ cursor: 'grabbing' }}
      _hover={{
        boxShadow: 'md',
        borderColor: 'blue.300',
      }}
      transition="all 0.2s ease"
    >
      <Text fontSize="sm" fontWeight="medium" color="gray.700">
        {title}
      </Text>
    </Flex>
  );
};

export default DraggableCard;
