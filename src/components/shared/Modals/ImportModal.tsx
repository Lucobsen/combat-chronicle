import { Box, Button, Modal, Stack, Typography, useTheme } from "@mui/material";

interface IImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: string[];
  onImport: (index: number) => void;
  title: string;
}

export const ImportModal = ({
  isOpen,
  onClose,
  items,
  onImport,
  title,
}: IImportModalProps) => {
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
        <Stack alignItems="center" spacing={1}>
          <Typography variant="h6" color={palette.text.primary}>
            {title}
          </Typography>
          {items.map((item, index) => (
            <Button
              key={`party-${item}-${index}`}
              variant="text"
              color="success"
              sx={{ fontWeight: "bold" }}
              onClick={() => onImport(index)}
            >
              {item}
            </Button>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
};
