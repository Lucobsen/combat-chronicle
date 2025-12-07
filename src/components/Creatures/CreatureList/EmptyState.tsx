import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import type { IHero } from '../../../api/parties';
import { usePartyContext } from '../../../utils/party-context';
import { ImportModal } from '../../shared/Modals/ImportModal';

interface IEmptyStateProps {
  onImport: (heroes: IHero[]) => void;
}

export const EmptyState = ({ onImport }: IEmptyStateProps) => {
  const { palette } = useTheme();
  const { partyList } = usePartyContext();
  const [isPartyModalOpen, setIsPartyModalOpen] = useState(false);

  const partiesWithHeros = partyList.filter(({ heroes }) => heroes.length > 0);

  const handleOnImport = (heroes: IHero[]) => {
    onImport(heroes);
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
          color={palette.text.primary}
        >
          Add creatures below to populate your encounter.
        </Typography>
        <Typography
          textAlign="center"
          variant="h6"
          alignSelf="center"
          color={palette.text.primary}
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
