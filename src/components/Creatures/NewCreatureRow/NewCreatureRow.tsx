import { AppBar, Toolbar } from '@mui/material';
import type { ICreature } from '../../../api/encounters';
import { letterMapping } from '../../../models/models';
import { useCreatureContext } from '../../../utils/creature-context';
import { ActiveState } from './ActiveState';
import { InitialState } from './InitialState';

interface INewCreatureRowProps {
  onAddSingleCreature: (newCreature: ICreature) => void;
  onAddMultipleCreatures: (newCreature: ICreature[]) => void;
  changeTurn: (step: -1 | 1) => void;
  inProgress: boolean;
}

export const NewCreatureRow = ({
  onAddSingleCreature,
  onAddMultipleCreatures,
  changeTurn,
  inProgress,
}: INewCreatureRowProps) => {
  const { creature, resetCreature } = useCreatureContext();

  const handleSingleAdd = () => {
    onAddSingleCreature(creature);
    resetCreature();
  };

  const handleMultiAdd = (creatureQuantity: number) => {
    const keyArray = Array.from(Array(creatureQuantity).keys());
    const creatures: ICreature[] = keyArray.map((count) => ({
      ...creature,
      name: `${creature.name} (${letterMapping[count]})`,
      id: crypto.randomUUID(),
    }));

    onAddMultipleCreatures(creatures);
    resetCreature();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        boxShadow: 'none',
        bottom: 0,
        borderTop: ({ palette }) =>
          `1px solid ${
            palette.mode === 'light'
              ? palette.common.black
              : palette.common.white
          }`,
      }}
    >
      <Toolbar
        sx={{
          p: ({ spacing }) => spacing(1.5, 1),
          backgroundColor: ({ palette }) =>
            palette.mode === 'light' ? palette.common.white : '#121212',
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
