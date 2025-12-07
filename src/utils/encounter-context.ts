import type { IEncounter } from '../api/encounters';
import { createContextUtil } from './context';

type EncounterContextProps = {
  encounters: IEncounter[];
  updateEncounters: (updatedList: IEncounter[]) => void;
  updateSelectedEncounter: (updatedEncounter: IEncounter) => void;
};

export const [useEncounterContext, ProviderEncounterContext] =
  createContextUtil<EncounterContextProps>();
