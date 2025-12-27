import { Button, Container, Skeleton, Stack } from '@mui/material';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';
import type { PartyObject } from '../../../../convex/schema';
import { useGetParties } from '../../../api/parties/useGetParties';
import { NamingModal } from '../../shared/Modals/NamingModal';
import { PartyItem } from '../PartyItem/PartyItem';
import { EmptyState } from './EmptyState';

export const PartyList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { parties, isLoading } = useGetParties();
  const addParty = useMutation(api.parties.post);
  const deleteParty = useMutation(api.parties.deleteParty);
  const patchParty = useMutation(api.parties.patchParty);

  const handleOnAddNewParty = (
    newParty: Omit<PartyObject, 'createdBy' | 'updatedAt'>
  ) => addParty(newParty);

  const handleOnUpdate = (
    id: Id<'parties'>,
    heroes: {
      id: string;
      name: string;
    }[],
    name: string,
    createdBy: string
  ) => patchParty({ id, heroes: heroes, name, createdBy });

  const handleOnDeleteParty = (id: Id<'parties'>, createdBy: string) =>
    deleteParty({ id, createdBy });

  return (
    <>
      <Container sx={{ px: 2, pt: 9, pb: 8 }}>
        {isLoading ? (
          <Stack alignItems="center" spacing={2}>
            <Skeleton width="100%" height="52px" sx={{ transform: 'none' }} />
            <Skeleton width="100%" height="52px" sx={{ transform: 'none' }} />
            <Skeleton width="100%" height="52px" sx={{ transform: 'none' }} />
            <Skeleton width="100%" height="52px" sx={{ transform: 'none' }} />
            <Skeleton width="100%" height="52px" sx={{ transform: 'none' }} />
            <Skeleton width="100%" height="52px" sx={{ transform: 'none' }} />
          </Stack>
        ) : parties.length > 0 ? (
          <>
            <Stack alignItems="center" spacing={2}>
              {parties.map(({ _id, name, heroes, createdBy }) => (
                <PartyItem
                  name={name}
                  heroes={heroes}
                  key={_id}
                  onDeleteParty={() => handleOnDeleteParty(_id, createdBy)}
                  onAdd={(newHeroName) =>
                    handleOnUpdate(
                      _id,
                      [
                        ...heroes,
                        { name: newHeroName, id: crypto.randomUUID() },
                      ],
                      name,
                      createdBy
                    )
                  }
                  onDelete={(heroId) =>
                    handleOnUpdate(
                      _id,
                      heroes.filter((hero) => hero.id !== heroId),
                      name,
                      createdBy
                    )
                  }
                  onUpdate={(id, newHeroName) =>
                    handleOnUpdate(
                      _id,
                      heroes.map((hero) =>
                        hero.id === id ? { ...hero, name: newHeroName } : hero
                      ),
                      name,
                      createdBy
                    )
                  }
                  onUpdatePartyName={(updatedPartyName) =>
                    handleOnUpdate(_id, heroes, updatedPartyName, createdBy)
                  }
                />
              ))}
            </Stack>
            <Button
              disabled={parties.length >= 6}
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
              Add party
            </Button>
          </>
        ) : (
          <EmptyState openModal={() => setIsAddModalOpen(true)} />
        )}
      </Container>

      <NamingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        placeholder="Enter party name"
        label="Party Name"
        onCreate={(newName) => {
          setIsAddModalOpen(false);
          handleOnAddNewParty({
            heroes: [],
            name: newName,
          });
        }}
      />
    </>
  );
};
