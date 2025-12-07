import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { differenceInHours, format } from 'date-fns';
import { useState } from 'react';
import { NamingModal } from '../../shared/Modals/NamingModal';
import { TextModal } from '../../shared/Modals/TextModal';

const getTime = (timeValue: string) => {
  const isOverTwentyFourHours =
    differenceInHours(new Date(timeValue).getTime(), Date.now()) > 24;

  return isOverTwentyFourHours
    ? format(timeValue, 'dd/MM/y')
    : format(timeValue, 'kk:mm');
};

interface IEncounterItemProps {
  id: string;
  name: string;
  onUpdate: (newName: string) => void;
  onDelete: (id: string) => void;
  lastUpdatedOn: string;
  inProgress: boolean;
  creatureCount: number;
}

export const EncounterItem = ({
  id,
  name,
  onUpdate,
  onDelete,
  lastUpdatedOn,
  inProgress,
  creatureCount,
}: IEncounterItemProps) => {
  const { palette } = useTheme();
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <Box
        width="80%"
        bgcolor={palette.background.default}
        color="#fff"
        border={`1px solid ${palette.background.paper}`}
        borderRadius={2}
        p={1}
        sx={{ width: '100%' }}
      >
        <Grid container alignItems="center">
          <Grid size={{ xs: 10.5 }} overflow="hidden " textOverflow="ellipsis">
            <Link
              textAlign="center"
              noWrap
              href={id}
              underline="none"
              color="primary"
              variant="h6"
            >
              {name}
            </Link>
            <Stack direction="row" spacing={1}>
              <Typography fontSize="small">
                Updated: {getTime(lastUpdatedOn)}
              </Typography>

              <Divider
                orientation="vertical"
                flexItem
                color={palette.divider}
              />

              <Typography fontSize="small">
                {`${creatureCount === 0 ? 'No' : creatureCount} Creatures`}
              </Typography>

              {inProgress && (
                <>
                  <Divider
                    orientation="vertical"
                    flexItem
                    color={palette.divider}
                  />
                  <Typography fontSize="small" color={palette.success.main}>
                    In Progress
                  </Typography>
                </>
              )}
            </Stack>
          </Grid>

          <Grid size={{ xs: 1.5 }}>
            <IconButton
              onClick={() => setIsRenameOpen(true)}
              color="info"
              size="small"
            >
              <DriveFileRenameOutlineIcon />
            </IconButton>

            <IconButton
              onClick={() => setIsDeleteOpen(true)}
              color="error"
              size="small"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <NamingModal
        isOpen={isRenameOpen}
        onClose={() => setIsRenameOpen(false)}
        onCreate={(newName) => {
          onUpdate(newName);
          setIsRenameOpen(false);
        }}
        label="Encounter Name"
        placeholder="Enter encounter name"
        value={name}
      />

      <TextModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          onDelete(id);
          setIsDeleteOpen(false);
        }}
        content={`Do you wish to delete "${name}"?`}
      />
    </>
  );
};
