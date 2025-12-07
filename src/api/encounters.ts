export interface ICreature {
  id: string;
  initative: string;
  name: string;
  hp?: string;
  isHidden: boolean;
  conditions: string[];
  isEnemy: boolean;
}

export interface IEncounter {
  creatures: ICreature[];
  id: string;
  name: string;
  createdOn: string;
  lastUpdatedOn: string;
  round: number;
  activeCreatureId: string;
  inProgress: boolean;
}

const ENCOUNTERS_KEY = "encounters";

export const getEncounters = (): IEncounter[] => {
  const localEncounters = localStorage.getItem(ENCOUNTERS_KEY);

  if (localEncounters === null) return [];

  const encounters: IEncounter[] = JSON.parse(localEncounters);

  return encounters.map((encounter) => ({
    ...encounter,
    creatures: encounter.creatures.map((creature) => ({
      ...creature,
      isEnemy:
        creature.isEnemy !== undefined
          ? creature.isEnemy
          : creature.hp === undefined,
    })),
    inProgress:
      encounter.inProgress !== undefined
        ? encounter.inProgress
        : encounter.round > 1 || encounter.activeCreatureId !== "",
  }));
};

export const setEncounters = (value: IEncounter[]) =>
  localStorage.setItem(ENCOUNTERS_KEY, JSON.stringify(value));
