import { Box, Button, Modal, Stack, Typography, useTheme } from "@mui/material";

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
}: ITextModalProps) => {
  const { palette } = useTheme();

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        width="80%"
        p={2}
        borderRadius={2}
        sx={{
          bgcolor: palette.background.default,
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
          color={palette.text.primary}
        >
          {content}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Button variant="contained" fullWidth color="info" onClick={onClose}>
            No
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={onConfirm}
          >
            Yes
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
