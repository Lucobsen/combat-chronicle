import AddIcon from '@mui/icons-material/Add';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { quantities } from '../../../models/models';
import { useCreatureContext } from '../../../utils/creature-context';

interface IInitialStateProps {
  onSingleAdd: () => void;
  onMultiAdd: (creatureQuantity: number) => void;
}

export const InitialState = ({
  onSingleAdd,
  onMultiAdd,
}: IInitialStateProps) => {
  const { creature, isAddDisabled, setCreature } = useCreatureContext();
  const [creatureQuantity, setCreatureQuantity] = useState(1);

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          size="small"
          type="number"
          label="Init"
          sx={{ width: '40%' }}
          onChange={({ target }) =>
            setCreature({ ...creature, initative: target.value })
          }
          value={creature.initative}
          variant="outlined"
          placeholder="Init"
          required
        />

        <TextField
          size="small"
          type="text"
          label="Name"
          fullWidth
          onChange={({ target }) =>
            setCreature({ ...creature, name: target.value })
          }
          value={creature.name}
          variant="outlined"
          placeholder="Name"
          required
        />

        <TextField
          size="small"
          type="number"
          label="HP"
          sx={{ width: '40%' }}
          onChange={({ target }) =>
            setCreature({ ...creature, hp: target.value })
          }
          value={creature.hp ?? ''}
          variant="outlined"
          placeholder="HP"
        />

        <IconButton
          disabled={isAddDisabled}
          color="success"
          onClick={() => {
            if (creatureQuantity > 1) {
              onMultiAdd(creatureQuantity);
              setCreatureQuantity(1);
            } else {
              onSingleAdd();
            }
          }}
        >
          <AddIcon />
        </IconButton>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          select
          size="small"
          type="number"
          value={creatureQuantity}
          sx={{ width: '20%' }}
          label="Quantity"
          onChange={({ target }) =>
            setCreatureQuantity(Number.parseInt(target.value))
          }
        >
          {quantities.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              color="error"
              onChange={(_event, checked) =>
                setCreature({ ...creature, isEnemy: checked })
              }
            />
          }
          label="ENEMY CREATURE?"
        />
      </Stack>
    </Stack>
  );
};
