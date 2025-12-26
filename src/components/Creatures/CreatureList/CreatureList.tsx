import { Container, List } from '@mui/material';
import type { ICreature } from '../../../api/encounters';
import { Creature } from '../Creature/Creature';
import { EmptyState } from './EmptyState';

interface ICreatureList {
  creatureList: ICreature[];
  activeCreatureId: string;
  onUpdate: (updatedCreature: ICreature) => void;
  onDelete: (deletedCreatureId: string) => void;
  onImport: (
    heroes: {
      id: string;
      name: string;
    }[]
  ) => void;
}

export const CreatureList = ({
  creatureList,
  activeCreatureId,
  onDelete,
  onUpdate,
  onImport,
}: ICreatureList) => {
  const hasCreatures = creatureList.length > 0;

  if (!hasCreatures) return <EmptyState onImport={onImport} />;

  return (
    <Container sx={{ px: 2, pt: 9, pb: 10 }}>
      <List disablePadding>
        {creatureList.map((creature) => (
          <Creature
            hasCurrentTurn={activeCreatureId === creature.id}
            key={creature.id}
            creature={creature}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </List>
    </Container>
  );
};
