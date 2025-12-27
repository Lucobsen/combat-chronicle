import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';
import type { CreatureObject } from '../../../../convex/schema';
import { useGetParties } from '../../../api/parties/useGetParties';
import { ImportModal } from '../../shared/Modals/ImportModal';

export const EmptyState = ({
  createdBy,
  encounterId,
}: {
  createdBy: string;
  encounterId: Id<'encounters'>;
}) => {
  const { palette } = useTheme();
  const [isPartyModalOpen, setIsPartyModalOpen] = useState(false);

  const { parties } = useGetParties();
  const addCreatures = useMutation(api.encounters.addCreatures);

  const partiesWithHeros = parties.filter(({ heroes }) => heroes.length > 0);

  const handleOnImport = (
    heroes: {
      id: string;
      name: string;
    }[]
  ) => {
    const newCreatures = heroes.map<CreatureObject>(({ id, name }) => ({
      conditions: [],
      id,
      name,
      isHidden: false,
      initative: '',
      isEnemy: false,
      createdBy,
      updatedAt: Date.now(),
    }));

    addCreatures({ id: encounterId, creatures: newCreatures, createdBy });

    setIsPartyModalOpen(false);
  };

  return (
    <>
      <Stack
        position="absolute"
        left="50%"
        top="40%"
        justifyContent="center"
        width="80%"
        spacing={1}
        sx={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography
          textAlign="center"
          variant="h6"
          alignSelf="center"
          color="#fff"
        >
          Add creatures below to populate your encounter.
        </Typography>
        <Typography
          textAlign="center"
          variant="h6"
          alignSelf="center"
          color="#fff"
        >
          Creatures with HP will be tracked as ENEMIES!
        </Typography>

        {partiesWithHeros.length > 0 && (
          <Stack alignItems="center">
            <Divider
              orientation="horizontal"
              color={palette.divider}
              sx={{ my: 2, width: '100%' }}
            />
            <Typography
              textAlign="center"
              variant="h6"
              alignSelf="center"
              color={palette.text.primary}
            >
              You can also
            </Typography>

            <Button
              size="small"
              variant="contained"
              color="success"
              sx={{ width: 'fit-content' }}
              onClick={() => setIsPartyModalOpen(true)}
            >
              <b>IMPORT</b>
            </Button>

            <Typography
              textAlign="center"
              variant="h6"
              alignSelf="center"
              color={palette.text.primary}
            >
              a party to quickly populate your encounter.
            </Typography>
          </Stack>
        )}
      </Stack>

      <ImportModal
        isOpen={isPartyModalOpen}
        onClose={() => setIsPartyModalOpen(false)}
        items={partiesWithHeros.map(({ name }) => name)}
        onImport={(index) => handleOnImport(partiesWithHeros[index].heroes)}
        title="Select Party to Import"
      />
    </>
  );
};
