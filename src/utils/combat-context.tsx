import { createContext } from 'react';

export interface ICombatContext {
  activeCreatureId: string | undefined;
}

export const CombatContext = createContext<ICombatContext>({
  activeCreatureId: undefined,
});
