import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { CreatureObject } from '../../convex/schema';
import { CreatureList } from '../components/Creatures/CreatureList/CreatureList';
import { NavBar } from '../components/Creatures/CreatureNavBar/CreatureNavBar';
import { NewCreatureRow } from '../components/Creatures/NewCreatureRow/NewCreatureRow';
import { DesktopWarning } from '../components/shared/DesktopWarning/DesktopWarning';
import { useIsMobile } from '../hooks/is-mobile.hook';

const sortCreatures = (creatures: CreatureObject[]) =>
  creatures.sort(
    (creatureA, creatureB) =>
      Number.parseInt(creatureB.initative) -
      Number.parseInt(creatureA.initative)
  );

const Creatures = () => {
  const navigate = useNavigate();
  const { encounterId } = Route.useParams();
  const isMobile = useIsMobile();

  const encounters = useQuery(api.encounters.getEncounters) ?? [];
  const selectedEncounter = encounters.find(({ _id }) => encounterId === _id);

  const addCreatures = useMutation(api.encounters.addCreatures);
  const resetEncounter = useMutation(api.encounters.resetEncounter);
  const updateEncounterTurn = useMutation(api.encounters.updateEncounterTurn);
  const startEncounter = useMutation(api.encounters.startEncounter);
  const setActiveCreatureId = useMutation(api.encounters.setActiveCreatureId);

  if (!selectedEncounter) return navigate({ to: '/' });
  if (!isMobile) return <DesktopWarning />;

  const {
    _id,
    createdBy,
    creatures,
    round,
    activeCreatureId,
    name: encounterName,
    inProgress,
  } = selectedEncounter;

  const handleSingleAdd = (newCreature: CreatureObject) => {
    const sortedCreatures = sortCreatures([...creatures, newCreature]);

    addCreatures({
      id: _id,
      creatures: sortedCreatures,
      createdBy,
    });
  };

  const handleMultiAdd = (newCreatures: CreatureObject[]) => {
    const sortedCreatures: CreatureObject[] = sortCreatures([
      ...creatures,
      ...newCreatures,
    ]);

    addCreatures({
      id: _id,
      creatures: sortedCreatures,
      createdBy,
    });
  };

  const handleDelete = (deletedCreatureId: string) => {
    const tempList = creatures.filter(
      (creature) => creature.id !== deletedCreatureId
    );

    if (tempList.length === 0) {
      resetEncounter({
        id: _id,
        createdBy,
        creatures: [],
      });
    } else {
      const sortedCreatures = sortCreatures(tempList);

      addCreatures({
        id: _id,
        creatures: sortedCreatures,
        createdBy,
      });
    }
  };

  const handleUpdate = (updatedCreature: CreatureObject) => {
    const tempList = [...creatures];

    const index = tempList.findIndex(
      (creature) => creature.id === updatedCreature.id
    );

    if (index >= 0) {
      tempList[index] = updatedCreature;
      const sortedCreatures = sortCreatures(tempList);

      addCreatures({ id: _id, creatures: sortedCreatures, createdBy });
    }
  };

  const incrementTurn = (
    currentIndex: number,
    creatureCount: number,
    firstCreatureId: string
  ) => {
    const newRound = currentIndex + 1 === creatureCount ? round + 1 : round;
    const nextCreatureId = creatures[currentIndex + 1]?.id ?? firstCreatureId;

    updateEncounterTurn({
      id: _id,
      round: newRound,
      activeCreatureId: nextCreatureId,
      createdBy,
    });
  };

  const decrementTurn = (currentIndex: number, creatureCount: number) => {
    const newRound = currentIndex === 0 ? round - 1 : round;

    if (newRound !== 0) {
      const nextCreatureId =
        currentIndex === 0
          ? creatures[creatureCount - 1]?.id
          : creatures[currentIndex - 1]?.id;

      updateEncounterTurn({
        id: _id,
        round: newRound,
        activeCreatureId: nextCreatureId,
        createdBy,
      });
    }
  };

  const handleTurnChange = (step: -1 | 1) => {
    const creatureCount = creatures.length;

    // if there is no creatures left
    // reset the encounter
    if (creatures.length === 0)
      return resetEncounter({
        id: _id,
        createdBy,
        creatures: [],
      });

    const firstCreatureId = creatures[0].id;
    const activeCreature = creatures.find(({ id }) => id === activeCreatureId);

    // if there is no active creature, set the first creature as the active one
    if (activeCreature === undefined)
      return setActiveCreatureId({
        id: _id,
        activeCreatureId: firstCreatureId,
        createdBy,
      });

    const currentIndex = creatures.findIndex(
      ({ id }) => id === activeCreatureId
    );

    // on increment
    if (step === 1) incrementTurn(currentIndex, creatureCount, firstCreatureId);

    // on decrement
    if (step === -1) decrementTurn(currentIndex, creatureCount);
  };

  const handleReset = () =>
    resetEncounter({
      id: _id,
      createdBy,
      creatures: [],
    });

  const handleStartEncounter = () =>
    startEncounter({
      id: _id,
      createdBy,
      activeCreatureId: creatures[0]?.id ?? '',
    });

  return (
    <>
      <NavBar
        onReset={handleReset}
        encounterName={encounterName}
        round={round}
        hasCreatures={creatures.length > 0}
        startEncounter={handleStartEncounter}
        inProgress={inProgress}
      />
      <CreatureList
        activeCreatureId={activeCreatureId}
        creatureList={creatures}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        createdBy={createdBy}
        encounterId={_id}
      />
      <NewCreatureRow
        changeTurn={handleTurnChange}
        onAddSingleCreature={handleSingleAdd}
        onAddMultipleCreatures={handleMultiAdd}
        inProgress={inProgress}
      />
    </>
  );
};

export const Route = createFileRoute('/$encounterId')({
  component: Creatures,
});
