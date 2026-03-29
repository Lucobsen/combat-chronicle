import { useMemo, useState, type ReactNode } from 'react';
import { CombatContext, type ICombatContext } from './combat-context';

export const CombatContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeCreatureId, setActiveCreatureId] = useState();

  const value = useMemo<ICombatContext>(
    () => ({
      activeCreatureId,
      setActiveCreatureId,
    }),
    [activeCreatureId]
  );

  return (
    <CombatContext.Provider value={value}>{children}</CombatContext.Provider>
  );
};
