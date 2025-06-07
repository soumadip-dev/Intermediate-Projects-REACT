import React, { useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DraggableCardProps {
  title: string;
  id: string | number;
  section: string;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ title, id, section }) => {
  const { isDragging, setNodeRef, listeners, attributes, transform } = useDraggable({
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
      transform={CSS.Translate.toString(transform)}
      direction="column"
      p={3}
      borderRadius="md"
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow={isDragging ? 'xl' : 'sm'}
      cursor="grab"
      opacity={isDragging ? 0.8 : 1}
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
