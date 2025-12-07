import type { Dispatch } from "react";
import type { ICreature } from "../api/encounters";
import { createContextUtil } from "./context";

type CreatureContextProps = {
  creature: ICreature;
  setCreature: Dispatch<React.SetStateAction<ICreature>>;
  resetCreature: () => void;
  isAddDisabled: boolean;
};

export const [useCreatureContext, ProviderCreatureContext] =
  createContextUtil<CreatureContextProps>();
