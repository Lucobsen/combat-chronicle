import { Button, Container, Stack } from '@mui/material';
import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';
import { NamingModal } from '../../shared/Modals/NamingModal';
import { EncounterItem } from '../EncounterItem/EncounterItem';
import { EmptyState } from './EmptyState';

export const EncounterList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const encounters = useQuery(api.encounters.getEncounters) ?? [];
  const updateEncounterName = useMutation(api.encounters.updateEncounterName);
  const createEncounter = useMutation(api.encounters.createEncounter);
  const deleteEncounter = useMutation(api.encounters.deleteEncounter);

  const handleNameChange = (
    newName: string,
    id: Id<'encounters'>,
    createdBy: string
  ) => updateEncounterName({ id, name: newName, createdBy });

  const handleOnCreate = (newName: string) => {
    createEncounter({
      name: newName,
      creatures: [],
      round: 1,
      activeCreatureId: '',
      inProgress: false,
    });

    setIsAddModalOpen(false);

    // TODO!
    // navigate({ to: '..', search: { id: newEncounter.id } });
  };

  const handleOnDelete = (id: Id<'encounters'>, createdBy: string) =>
    deleteEncounter({ id, createdBy });

  return (
    <>
      <Container sx={{ px: 4, pt: 9, pb: 8 }}>
        {encounters.length > 0 ? (
          <>
            <Stack alignItems="center" spacing={2}>
              {encounters.map(
                ({
                  name,
                  _id,
                  updatedAt,
                  inProgress,
                  creatures,
                  createdBy,
                }) => (
                  <EncounterItem
                    key={_id}
                    id={_id}
                    name={name}
                    creatureCount={creatures.length}
                    inProgress={inProgress}
                    updatedAt={updatedAt}
                    onDelete={() => handleOnDelete(_id, createdBy)}
                    onUpdate={(newName) =>
                      handleNameChange(newName, _id, createdBy)
                    }
                  />
                )
              )}
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
