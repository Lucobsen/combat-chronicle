export interface IHero {
  id: string;
  name: string;
}

export interface IParty {
  id: string;
  name: string;
  heroes: IHero[];
}

const PARTIES_KEY = "parties";

export const getParties = (): IParty[] => {
  const localEncounters = localStorage.getItem(PARTIES_KEY);

  if (localEncounters === null) return [];

  return JSON.parse(localEncounters);
};

export const setParties = (value: IParty[]) =>
  localStorage.setItem(PARTIES_KEY, JSON.stringify(value));
