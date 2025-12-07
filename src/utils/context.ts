import { createContext, useContext } from "react";

export const createContextUtil = <T extends unknown | null>() => {
  const context = createContext<T | undefined>(undefined);

  const useContextHelper = () => {
    const contextHelp = useContext(context);
    if (contextHelp === undefined)
      throw new Error("useContext must be inside a ContextProvider!");
    return contextHelp;
  };

  return [useContextHelper, context.Provider] as const;
};
