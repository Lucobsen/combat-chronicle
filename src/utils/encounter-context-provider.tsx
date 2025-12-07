import { isBefore } from "date-fns";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { getEncounters, type IEncounter, setEncounters } from "../api/encounters";
import { ProviderEncounterContext } from "./encounter-context";

const sortEncounters = (encounters: IEncounter[]) =>
  encounters.sort((encounterA, encounterB) =>
    isBefore(encounterA.lastUpdatedOn, encounterB.lastUpdatedOn) ? 1 : -1
  );


type EncounterContextProviderProps = {
  children: ReactNode;
};

export const EncounterContextProvider = ({
  children,
}: EncounterContextProviderProps) => {
  const [encounters, setEncounterList] = useState<IEncounter[]>(
    getEncounters()
  );

  const updateEncounters = useCallback((updatedList: IEncounter[]) => {
    const sortedList = sortEncounters(updatedList);

    setEncounterList(sortedList);
    setEncounters(sortedList);
  }, []);

  const updateSelectedEncounter = useCallback(
    (updatedEncounter: IEncounter) => {
      const otherEncounters = encounters.filter(
        ({ id }) => id !== updatedEncounter.id
      );
      const updatedList = [...otherEncounters, updatedEncounter];
      const sortedList = sortEncounters(updatedList);

      setEncounterList(sortedList);
      setEncounters(sortedList);
    },
    [encounters]
  );

  const value = useMemo(
    () => ({
      encounters,
      updateEncounters,
      updateSelectedEncounter,
    }),
    [encounters, updateEncounters, updateSelectedEncounter]
  );

  return (
    <ProviderEncounterContext value={value}>
      {children}
    </ProviderEncounterContext>
  );
};
