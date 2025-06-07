import React from 'react';
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

  const getCardColor = () => {
    switch (section) {
      case 'Todo':
        return 'red.50';
      case 'In Progress':
        return 'yellow.50';
      case 'Done':
        return 'green.50';
      default:
        return 'white';
    }
  };

  return (
    <Flex
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      transform={CSS.Translate.toString(transform)}
      direction="column"
      p={4}
      borderRadius="md"
      bg={getCardColor()}
      borderLeft="4px solid"
      borderColor={getCardColor().replace('50', '300')}
      boxShadow={isDragging ? 'lg' : 'sm'}
      cursor="grab"
      opacity={isDragging ? 0.8 : 1}
      _active={{ cursor: 'grabbing' }}
      _hover={{
        boxShadow: 'md',
      }}
      transition="all 0.2s ease"
    >
      <Text fontSize="md" fontWeight="medium" color="gray.800">
        {title}
      </Text>
      <Text fontSize="xs" color="gray.500" mt={1}>
        {section}
      </Text>
    </Flex>
  );
};

export default DraggableCard;
