import { Box, IconButton, Modal, Stack, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

interface INamingModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeholder: string;
  label: string;
  onCreate: (newName: string) => void;
  value?: string;
}

export const NamingModal = ({
  isOpen,
  onClose,
  placeholder,
  label,
  onCreate,
  value = "",
}: INamingModalProps) => {
  const [newNameValue, setNewNameValue] = useState("");

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        if (newNameValue !== "") onCreate(newNameValue);
        setNewNameValue("");
        onClose();
      }}
    >
      <Box
        width="80%"
        p={2}
        borderRadius={2}
        bgcolor={({ palette }) => palette.background.default}
        position="absolute"
        left="50%"
        top="50%"
        sx={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <Stack direction="row" spacing={1}>
          <TextField
            multiline
            placeholder={placeholder}
            defaultValue={value}
            label={label}
            fullWidth
            onChange={({ target }) => setNewNameValue(target.value)}
          />

          <IconButton
            disabled={newNameValue === ""}
            color="success"
            onClick={() => onCreate(newNameValue)}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </Box>
    </Modal>
  );
};
