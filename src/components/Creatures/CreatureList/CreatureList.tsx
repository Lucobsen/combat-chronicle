import { Container, List } from '@mui/material';
import type { Id } from '../../../../convex/_generated/dataModel';
import type { CreatureObject } from '../../../../convex/schema';
import { Creature } from '../Creature/Creature';
import { EmptyState } from './EmptyState';

interface ICreatureList {
  creatureList: CreatureObject[];
  activeCreatureId: string;
  createdBy: string;
  encounterId: Id<'encounters'>;
  onUpdate: (updatedCreature: CreatureObject) => void;
  onDelete: (deletedCreatureId: string) => void;
}

export const CreatureList = ({
  creatureList,
  activeCreatureId,
  onDelete,
  onUpdate,
  createdBy,
  encounterId,
}: ICreatureList) => {
  const hasCreatures = creatureList.length > 0;

  if (!hasCreatures)
    return <EmptyState createdBy={createdBy} encounterId={encounterId} />;

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
