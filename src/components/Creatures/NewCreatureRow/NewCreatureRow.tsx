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
  const handleSingleAdd = () => {
    onAddSingleCreature({
      conditions: [],
      createdBy: '',
      id: crypto.randomUUID(),
      initative: '',
      isEnemy: true,
      isHidden: false,
      name: '',
      updatedAt: Date.now(),
    });
  };

  const handleMultiAdd = () => {
    onAddMultipleCreatures([]);
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
          <ActiveState changeTurn={changeTurn} onAdd={handleSingleAdd} />
        ) : (
          <InitialState
            onSingleAdd={handleSingleAdd}
            onMultiAdd={handleMultiAdd}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};
