import { AppBar, Toolbar } from '@mui/material';
import type { CreatureObject } from '../../../../convex/schema';
import { ActiveState } from './ActiveState';
import { InitialState } from './InitialState';

interface INewCreatureRowProps {
  onAddSingleCreature: (newCreature: CreatureObject) => void;
  onAddMultipleCreatures: (newCreature: CreatureObject[]) => void;
  changeTurn: (step: -1 | 1) => void;
  inProgress: boolean;
}

export const NewCreatureRow = ({
  onAddSingleCreature,
  onAddMultipleCreatures,
  changeTurn,
  inProgress,
}: INewCreatureRowProps) => {
  const handleMultiAdd = (quantity: number, newCreature: CreatureObject) => {
    const newCreatures = [];
    let start = 0;

    do {
      newCreatures.push({ ...newCreature, id: crypto.randomUUID() });
      start++;
    } while (start < quantity);

    onAddMultipleCreatures(newCreatures);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        boxShadow: 'none',
        bottom: 0,
        borderTop: ({ palette }) => `1px solid ${palette.common.white}`,
      }}
    >
      <Toolbar
        sx={{
          p: ({ spacing }) => spacing(1.5, 1),
          backgroundColor: ({ palette }) => palette.background.default,
        }}
      >
        {inProgress ? (
          <ActiveState changeTurn={changeTurn} onAdd={onAddSingleCreature} />
        ) : (
          <InitialState
            onSingleAdd={onAddSingleCreature}
            onMultiAdd={(quantity, newCreature) =>
              handleMultiAdd(quantity, newCreature)
            }
          />
        )}
      </Toolbar>
    </AppBar>
  );
};
