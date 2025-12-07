import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton, ListItem, Stack, TextField } from "@mui/material";
import { useDebounce } from "../../../utils/debouce";

interface IHeroItemProps {
  onDelete: () => void;
  onUpdate: (updatedHeroName: string) => void;
  name: string;
}

export const HeroItem = ({ onDelete, onUpdate, name }: IHeroItemProps) => {
  const debouncedChangeHandler = useDebounce((updatedHeroName: unknown) => {
    onUpdate(updatedHeroName as string);
  }, 1000);

  const handleUpdate = (updatedHeroName: string) => {
    debouncedChangeHandler(updatedHeroName);
  };

  return (
    <ListItem disableGutters sx={{ width: "100%" }}>
      <Stack direction="row" width="100%" spacing={1}>
        <IconButton size="small" onClick={onDelete} color="error">
          <DeleteOutlineIcon />
        </IconButton>
        <TextField
          size="small"
          type="text"
          defaultValue={name}
          onChange={({ target }) => handleUpdate(target.value)}
          fullWidth
          variant="standard"
          placeholder="Update hero name"
        />
      </Stack>
    </ListItem>
  );
};
