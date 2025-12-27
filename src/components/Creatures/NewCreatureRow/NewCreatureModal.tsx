import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

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
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        width="80%"
        p={2}
        borderRadius={2}
        sx={{
          bgcolor: ({ palette }) => palette.background.default,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography textAlign="center" variant="h6" mb={2} color="white">
          Enter New Creature Details
        </Typography>

        <Stack alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              size="small"
              type="number"
              required
              fullWidth
              onChange={({ target }) => console.log(target)}
              value={''}
              variant="outlined"
              placeholder="Init"
            />

            <TextField
              size="small"
              type="number"
              fullWidth
              onChange={({ target }) => console.log(target)}
              value={''}
              variant="outlined"
              placeholder="HP"
            />
          </Stack>

          <TextField
            size="small"
            type="text"
            required
            fullWidth
            onChange={({ target }) => console.log(target)}
            value={''}
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
              disabled={false}
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
