import { useMemo, useState, type ReactNode } from "react";
import { type ICreature } from "../api/encounters";
import { ProviderCreatureContext } from "./creature-context";

type CreatureContextProviderProps = {
  children: ReactNode;
};

export const CreatureContextProvider = ({
  children,
}: CreatureContextProviderProps) => {
  const [creature, setCreature] = useState<ICreature>({
    id: crypto.randomUUID(),
    name: "",
    initative: "",
    isHidden: false,
    conditions: [],
    isEnemy: true,
  });

  const noInit =
    creature.initative === undefined ||
    creature.initative === null ||
    creature.initative === "";

  const noName =
    creature.name === undefined ||
    creature.name === null ||
    creature.name === "";

  const value = useMemo(
    () => ({
      creature,
      setCreature,
      resetCreature: () =>
        setCreature({
          id: crypto.randomUUID(),
          name: "",
          initative: "",
          isHidden: false,
          conditions: [],
          isEnemy: true,
        }),
      isAddDisabled: noInit || noName,
    }),
    [creature, setCreature, noInit, noName]
  );

  return (
    <ProviderCreatureContext value={value}>{children}</ProviderCreatureContext>
  );
};
