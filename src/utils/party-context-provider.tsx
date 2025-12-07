import { type ReactNode, useMemo, useState } from "react";
import { getParties, type IParty, setParties } from "../api/parties";
import { ProviderPartyContext } from "./party-context";

type PartyContextProviderProps = {
  children: ReactNode;
};

export const PartyContextProvider = ({
  children,
}: PartyContextProviderProps) => {
  const [partyList, setPartyList] = useState<IParty[]>(getParties());

  const value = useMemo(
    () => ({
      partyList,
      updatePartyList: (updatedList: IParty[]) => {
        setPartyList(updatedList);
        setParties(updatedList);
      },
    }),
    [partyList]
  );

  return <ProviderPartyContext value={value}>{children}</ProviderPartyContext>;
};
