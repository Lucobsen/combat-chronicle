import { Box, Button, Modal, Stack, Typography } from '@mui/material';

interface ITextModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onConfirm: () => void;
}

export const TextModal = ({
  isOpen,
  onClose,
  content,
  onConfirm,
}: ITextModalProps) => (
  <Modal open={isOpen} onClose={onClose}>
    <Box
      sx={{
        bgcolor: ({ palette }) => palette.background.default,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography
        align="center"
        variant="h6"
        sx={{ mb: 2, color: ({ palette }) => palette.text.primary }}
      >
        {content}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          fullWidth
          color="info"
          onClick={onClose}
          sx={{ minWidth: '120px' }}
        >
          No
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="error"
          onClick={onConfirm}
          sx={{ minWidth: '120px' }}
        >
          Yes
        </Button>
      </Stack>
    </Box>
  </Modal>
);
