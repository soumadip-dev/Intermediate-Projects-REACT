import { Card, Flex, Text } from '@chakra-ui/react';
import DraggableCard from './DraggableCard';
import { useDroppable } from '@dnd-kit/core';

interface Card {
  id: string | number;
  title: string;
}

interface DropableSectionProps {
  title: string;
  items: Card[];
}

const DropableSection: React.FC<DropableSectionProps> = ({ title, items }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  const getSectionColor = () => {
    switch (title) {
      case 'Todo':
        return 'red.100';
      case 'In Progress':
        return 'yellow.100';
      case 'Done':
        return 'green.100';
      default:
        return 'gray.100';
    }
  };

  const getBorderColor = () => {
    switch (title) {
      case 'Todo':
        return 'red.300';
      case 'In Progress':
        return 'yellow.300';
      case 'Done':
        return 'green.300';
      default:
        return 'gray.300';
    }
  };

  return (
    <Flex direction="column" minW="300px" w="full" maxW="400px">
      <Text
        fontSize="lg"
        fontWeight="bold"
        color="gray.700"
        mb={2}
        px={2}
        textTransform="uppercase"
        letterSpacing="wide"
      >
        {title} ({items.length})
      </Text>
      <Flex
        ref={setNodeRef}
        direction="column"
        p={3}
        flex={1}
        borderRadius="lg"
        bg={isOver ? `${getSectionColor()}` : `${getSectionColor()}`}
        border="2px dashed"
        borderColor={isOver ? 'teal.400' : getBorderColor()}
        transition="all 0.2s ease"
        minH="300px"
        gap={3}
      >
        {items.map((card: Card) => (
          <DraggableCard section={title} title={card.title} id={card.id} key={card.id} />
        ))}
      </Flex>
    </Flex>
  );
};

export { DropableSection, Card };
