import AddIcon from '@mui/icons-material/Add';
import { IconButton, ListItem, Stack, TextField } from '@mui/material';
import { useState } from 'react';

interface INewHeroItemProps {
  onAdd: (newHeroName: string) => void;
}

export const NewHeroItem = ({ onAdd }: INewHeroItemProps) => {
  const [newHeroName, setNewHeroName] = useState('');

  return (
    <ListItem disableGutters sx={{ width: '100%' }}>
      <Stack direction="row" sx={{ width: '100%' }} spacing={1}>
        <IconButton
          size="small"
          color="success"
          onClick={() => {
            onAdd(newHeroName);
            setNewHeroName('');
          }}
          disabled={newHeroName === ''}
        >
          <AddIcon />
        </IconButton>
        <TextField
          size="small"
          type="text"
          fullWidth
          value={newHeroName}
          onChange={({ target }) => setNewHeroName(target.value)}
          variant="standard"
          placeholder="Add hero to party"
        />
      </Stack>
    </ListItem>
  );
};
