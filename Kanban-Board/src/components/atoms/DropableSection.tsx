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

  return (
    <Flex direction="column" minW="300px" w="full" maxW="400px">
      <Text fontSize="lg" fontWeight="bold" color="gray.600" mb={2} px={2}>
        {title}
      </Text>
      <Flex
        ref={setNodeRef}
        direction="column"
        p={2}
        flex={1}
        borderRadius="md"
        bg={isOver ? 'gray.200' : 'gray.100'}
        transition="background 0.2s ease"
        minH="200px"
        gap={2}
      >
        {items.map((card: Card) => (
          <DraggableCard section={title} title={card.title} id={card.id} key={card.id} />
        ))}
      </Flex>
    </Flex>
  );
};

export { DropableSection, Card };
