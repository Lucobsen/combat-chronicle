import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCreatureContext } from "../../../utils/creature-context";

interface INewCreatureModalProps {
  onAdd: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const NewCreatureModal = ({
  onAdd,
  isOpen,
  onClose,
}: INewCreatureModalProps) => {
  const { creature, isAddDisabled, setCreature } = useCreatureContext();

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        width="80%"
        p={2}
        borderRadius={2}
        sx={{
          bgcolor: ({ palette }) => palette.background.default,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          textAlign="center"
          variant="h6"
          mb={2}
          color='white'
        >
          Enter New Creature Details
        </Typography>

        <Stack alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              size="small"
              type="number"
              required
              fullWidth
              onChange={({ target }) =>
                setCreature({ ...creature, initative: target.value })
              }
              value={creature.initative}
              variant="outlined"
              placeholder="Init"
            />

            <TextField
              size="small"
              type="number"
              fullWidth
              onChange={({ target }) =>
                setCreature({ ...creature, hp: target.value })
              }
              value={creature?.hp ?? ""}
              variant="outlined"
              placeholder="HP"
            />
          </Stack>

          <TextField
            size="small"
            type="text"
            required
            fullWidth
            onChange={({ target }) =>
              setCreature({ ...creature, name: target.value })
            }
            value={creature.name}
            variant="outlined"
            placeholder="Name"
          />

          <Stack direction="row" alignItems="center" spacing={1} width="100%">
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isAddDisabled}
              variant="contained"
              fullWidth
              color="success"
              onClick={() => {
                onAdd();
                onClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};
