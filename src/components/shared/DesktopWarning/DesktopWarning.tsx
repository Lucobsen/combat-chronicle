import { Box, Stack, Typography, useTheme } from "@mui/material";
import DesktopAccessDisabledIcon from "@mui/icons-material/DesktopAccessDisabled";

export const DesktopWarning = () => {
  const { palette, shape } = useTheme();

  const TextItem = ({ label }: { label: string }) => (
    <Typography
      textAlign="center"
      variant="h5"
      color={palette.info.contrastText}
    >
      {label}
    </Typography>
  );

  return (
    <Stack
      alignItems="center"
      spacing={4}
      position="absolute"
      top="40%"
      left="50%"
      sx={{ transform: "translate(-50%, -50%)" }}
    >
      <DesktopAccessDisabledIcon
        sx={{
          color: palette.text.primary,
          fontSize: 160,
        }}
      />

      <Box
        width="100%"
        p={2}
        borderRadius={shape.borderRadius}
        bgcolor={palette.info.main}
        border={`2px solid ${palette.text.primary}`}
      >
        <TextItem label="Combat Chronicle does not yet support large resolutions." />
        <TextItem
          label="Please reduce your resolution or use a mobile device to enjoy Combat
          Chronicle."
        />
      </Box>
    </Stack>
  );
};
