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
import type { CreatureObject } from '../../../../convex/schema';
import { quantities } from '../../../models/models';

interface IInitialStateProps {
  onSingleAdd: (newCreature: CreatureObject) => void;
  onMultiAdd: (creatureQuantity: number, newCreature: CreatureObject) => void;
}

export const InitialState = ({
  onSingleAdd,
  onMultiAdd,
}: IInitialStateProps) => {
  const defaultCreature: CreatureObject = {
    hp: '',
    conditions: [],
    id: crypto.randomUUID(),
    initative: '',
    isEnemy: true,
    name: '',
    isHidden: false,
    createdBy: '',
    updatedAt: 0,
  };

  const [newCreature, setNewCreature] =
    useState<CreatureObject>(defaultCreature);
  const [creatureQuantity, setCreatureQuantity] = useState(1);

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          size="small"
          type="number"
          label="Init"
          slotProps={{ inputLabel: { sx: { color: '#fff' } } }}
          sx={{ width: '40%' }}
          onChange={({ target }) =>
            setNewCreature({ ...newCreature, initative: target.value })
          }
          value={newCreature.initative}
          variant="outlined"
          placeholder="Init"
          required
        />

        <TextField
          size="small"
          type="text"
          label="Name"
          fullWidth
          slotProps={{ inputLabel: { sx: { color: '#fff' } } }}
          onChange={({ target }) =>
            setNewCreature({ ...newCreature, name: target.value })
          }
          value={newCreature.name}
          variant="outlined"
          placeholder="Name"
          required
        />

        <TextField
          size="small"
          type="number"
          label="HP"
          sx={{ width: '40%' }}
          slotProps={{ inputLabel: { sx: { color: '#fff' } } }}
          onChange={({ target }) =>
            setNewCreature({ ...newCreature, hp: target.value })
          }
          value={newCreature.hp}
          variant="outlined"
          placeholder="HP"
        />

        <IconButton
          disabled={!newCreature.initative || !newCreature.name}
          color="success"
          onClick={() => {
            if (creatureQuantity > 1) {
              onMultiAdd(creatureQuantity, newCreature);
              setCreatureQuantity(1);
            } else {
              onSingleAdd(newCreature);
            }

            setNewCreature(defaultCreature);
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
          slotProps={{ inputLabel: { sx: { color: '#fff' } } }}
          onChange={({ target }) =>
            setCreatureQuantity(Number.parseInt(target.value))
          }
        >
          {quantities.map(({ label, value }) => (
            <MenuItem key={value} value={value} color="#fff">
              {label}
            </MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              color="error"
              onChange={(_, checked) =>
                setNewCreature({ ...newCreature, isEnemy: checked })
              }
            />
          }
          label="ENEMY CREATURE?"
        />
      </Stack>
    </Stack>
  );
};
