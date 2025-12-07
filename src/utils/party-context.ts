import type { IParty } from "../api/parties";
import { createContextUtil } from "./context";

type PartyContextProps = {
  partyList: IParty[];
  updatePartyList: (updatedList: IParty[]) => void;
};

export const [usePartyContext, ProviderPartyContext] =
  createContextUtil<PartyContextProps>();
