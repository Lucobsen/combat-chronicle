import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Link } from '@tanstack/react-router';
import { differenceInHours, format } from 'date-fns';
import { useState } from 'react';
import type { Id } from '../../../../convex/_generated/dataModel';
import type { EncounterObject } from '../../../../convex/schema';
import { NamingModal } from '../../shared/Modals/NamingModal';
import { TextModal } from '../../shared/Modals/TextModal';

const getTime = (timeValue: number) => {
  const isOverTwentyFourHours = differenceInHours(timeValue, Date.now()) > 24;

  return isOverTwentyFourHours
    ? format(timeValue, 'dd/MM/y')
    : format(timeValue, 'kk:mm');
};

interface IEncounterItemProps {
  id: Id<'encounters'>;
  onUpdate: (newName: string) => void;
  onDelete: () => void;
}

export const EncounterItem = ({
  id,
  onUpdate,
  onDelete,
  name,
  updatedAt,
  creatures = [],
  inProgress,
}: IEncounterItemProps & EncounterObject) => {
  const { palette } = useTheme();
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const creatureCount = creatures.length;

  return (
    <>
      <Box
        width="80%"
        bgcolor={palette.background.default}
        border={`1px solid ${palette.common.white}`}
        borderRadius={2}
        p={1}
        sx={{ width: '100%' }}
      >
        <Grid container alignItems="center">
          <Grid size={{ xs: 10.5 }} overflow="hidden " textOverflow="ellipsis">
            <Link to="/$encounterId" params={{ encounterId: id }}>
              {name}
            </Link>
            <Stack direction="row" spacing={1}>
              <Typography fontSize="small" color="white">
                Updated: {getTime(updatedAt)}
              </Typography>

              <Divider
                orientation="vertical"
                flexItem
                color={palette.common.white}
              />

              <Typography fontSize="small" color="white">
                {`${creatureCount === 0 ? 'No' : creatureCount} Creatures`}
              </Typography>

              {inProgress && (
                <>
                  <Divider
                    orientation="vertical"
                    flexItem
                    color={palette.common.white}
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
          onDelete();
          setIsDeleteOpen(false);
        }}
        content={`Do you wish to delete "${name}"?`}
      />
    </>
  );
};
