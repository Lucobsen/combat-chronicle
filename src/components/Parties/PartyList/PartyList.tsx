import { Button, Container, Stack } from '@mui/material';
import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';
import type { PartyObject } from '../../../../convex/schema';
import type { IHero } from '../../../api/parties';
import { NamingModal } from '../../shared/Modals/NamingModal';
import { PartyItem } from '../PartyItem/PartyItem';
import { EmptyState } from './EmptyState';

export const PartyList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const parties = useQuery(api.parties.get);
  const partyList = parties ?? [];
  const addParty = useMutation(api.parties.post);
  const deleteParty = useMutation(api.parties.deleteParty);
  const patchParty = useMutation(api.parties.patchParty);

  const handleOnAdd = (
    newParty: Omit<PartyObject, 'createdBy' | 'updatedAt'>
  ) => addParty(newParty);

  const handleOnUpdate = (
    id: Id<'parties'>,
    heroes: IHero[],
    name: string,
    createdBy: string
  ) => patchParty({ id, heroes: heroes, name, createdBy });

  const handleOnDeleteParty = (id: Id<'parties'>, createdBy: string) =>
    deleteParty({ id, createdBy });

  return (
    <>
      <Container sx={{ px: 2, pt: 9, pb: 8 }}>
        {partyList.length > 0 ? (
          <>
            <Stack alignItems="center" spacing={2}>
              {partyList.map(({ _id, name, heroes, createdBy }) => (
                <PartyItem
                  name={name}
                  heroes={heroes}
                  key={_id}
                  onDeleteParty={() => handleOnDeleteParty(_id, createdBy)}
                  onAdd={(newHeroName) =>
                    handleOnAdd({
                      name: newHeroName,
                      heroes: [],
                    })
                  }
                  onDelete={(heroId) =>
                    handleOnUpdate(
                      _id,
                      heroes.filter((hero) => hero.id !== heroId),
                      name,
                      createdBy
                    )
                  }
                  onUpdate={() => {}}
                  onUpdatePartyName={(updatedPartyName) =>
                    handleOnUpdate(_id, heroes, updatedPartyName, createdBy)
                  }
                />
              ))}
            </Stack>
            <Button
              disabled={partyList.length >= 6}
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
          handleOnAdd({
            heroes: [],
            name: newName,
          });
          setIsAddModalOpen(false);
        }}
      />
    </>
  );
};
