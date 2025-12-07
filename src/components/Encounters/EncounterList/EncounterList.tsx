import { Button, Container, Stack } from "@mui/material";
import { useState } from "react";
import type { IEncounter } from "../../../api/encounters";
import { useEncounterContext } from "../../../utils/encounter-context";
import { NamingModal } from "../../shared/Modals/NamingModal";
import { EncounterItem } from "../EncounterItem/EncounterItem";
import { EmptyState } from "./EmptyState";

export const EncounterList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { encounters, updateEncounters } = useEncounterContext();

  const handleNameChange = (newName: string, id: string) => {
    const tempList = [...encounters];
    const index = tempList.findIndex((item) => item.id === id);

    if (index >= 0) {
      tempList[index].name = newName;
      tempList[index].lastUpdatedOn = new Date().toISOString();
      updateEncounters(tempList);
    }
  };

  const handleOnCreate = (newName: string) => {
    const newEncounter: IEncounter = {
      id: crypto.randomUUID(),
      name: newName,
      creatures: [],
      createdOn: new Date().toISOString(),
      lastUpdatedOn: new Date().toISOString(),
      round: 1,
      activeCreatureId: "",
      inProgress: false,
    };

    updateEncounters([...encounters, newEncounter]);

    // navigate({ to: '..', search: { id: newEncounter.id } });
  };

  const handleOnDelete = (deletedId: string) => {
    const filteredEncounters = encounters.filter(({ id }) => id !== deletedId);

    updateEncounters(filteredEncounters);
  };

  return (
    <>
      <Container sx={{ px: 4, pt: 9, pb: 8 }}>
        {encounters.length > 0 ? (
          <>
            <Stack alignItems="center" spacing={2}>
              {encounters.map(
                ({ name, id, lastUpdatedOn, inProgress, creatures }) => (
                  <EncounterItem
                    key={id}
                    id={id}
                    name={name}
                    creatureCount={creatures.length}
                    inProgress={inProgress}
                    lastUpdatedOn={lastUpdatedOn}
                    onDelete={handleOnDelete}
                    onUpdate={(newName) => handleNameChange(newName, id)}
                  />
                )
              )}
            </Stack>
            <Button
              disabled={encounters.length >= 6}
              variant="contained"
              color="success"
              sx={{
                fontWeight: "bold",
                position: "fixed",
                bottom: "5%",
                left: "50%",
                width: "60%",
                transform: "translate(-50%, -50%)",
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
