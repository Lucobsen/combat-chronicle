import { Button, Container, Skeleton, Stack } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';
import { useGetEncounters } from '../../../api/encounters/useGetEncounters';
import { NamingModal } from '../../shared/Modals/NamingModal';
import { EncounterItem } from '../EncounterItem/EncounterItem';
import { EmptyState } from './EmptyState';

export const EncounterList = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { encounters, isLoading } = useGetEncounters();
  const updateEncounterName = useMutation(api.encounters.updateEncounterName);
  const createEncounter = useMutation(api.encounters.createEncounter);
  const deleteEncounter = useMutation(api.encounters.deleteEncounter);

  const handleNameChange = (
    newName: string,
    id: Id<'encounters'>,
    createdBy: string
  ) => updateEncounterName({ id, name: newName, createdBy });

  const handleOnCreate = async (newName: string) => {
    setIsAddModalOpen(false);

    const res: Id<'encounters'> = await createEncounter({
      name: newName,
      creatures: [],
      round: 1,
      activeCreatureId: '',
      inProgress: false,
    });

    navigate({ to: '..', search: { id: res } });
  };

  const handleOnDelete = (id: Id<'encounters'>, createdBy: string) =>
    deleteEncounter({ id, createdBy });

  return (
    <>
      <Container sx={{ px: 4, pt: 9, pb: 8 }}>
        {isLoading ? (
          <Stack alignItems="center" spacing={2}>
            <Skeleton width="100%" height="86px" sx={{ transform: 'none' }} />
            <Skeleton width="100%" height="86px" sx={{ transform: 'none' }} />
            <Skeleton width="100%" height="86px" sx={{ transform: 'none' }} />
            <Skeleton width="100%" height="86px" sx={{ transform: 'none' }} />
          </Stack>
        ) : encounters.length > 0 ? (
          <>
            <Stack alignItems="center" spacing={2}>
              {encounters.map((encounter) => (
                <EncounterItem
                  id={encounter._id}
                  {...encounter}
                  key={encounter._id}
                  onDelete={() =>
                    handleOnDelete(encounter._id, encounter.createdBy)
                  }
                  onUpdate={(newName) =>
                    handleNameChange(
                      newName,
                      encounter._id,
                      encounter.createdBy
                    )
                  }
                />
              ))}
            </Stack>
            <Button
              disabled={encounters.length >= 6}
              variant="contained"
              color="success"
              sx={{
                fontWeight: 'bold',
                position: 'fixed',
                bottom: '5%',
                left: '50%',
                width: '60%',
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => setIsAddModalOpen(true)}
            >
              Create new encounter
            </Button>
          </>
        ) : (
          <EmptyState openModal={() => setIsAddModalOpen(true)} />
        )}
      </Container>

      <NamingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        placeholder="Enter encounter name"
        label="Encounter Name"
        onCreate={handleOnCreate}
      />
    </>
  );
};
