import { defineSchema, defineTable } from 'convex/server';
import { v, type Infer } from 'convex/values';

const party = v.object({
  createdBy: v.string(),
  updatedAt: v.number(),
  name: v.string(),
  heroes: v.array(
    v.object({
      id: v.string(),
      name: v.string(),
    })
  ),
});

export type PartyObject = Infer<typeof party>;

const creature = v.object({
  createdBy: v.string(),
  updatedAt: v.number(),
  name: v.string(),
  initative: v.string(),
  hp: v.optional(v.string()),
  isHidden: v.boolean(),
  conditions: v.string(),
  isEnemy: v.boolean(),
});

const encounter = v.object({
  createdBy: v.string(),
  updatedAt: v.number(),
  name: v.string(),
  creatures: v.array(creature),
  round: v.number(),
  activeCreatureId: v.string(),
  inProgress: v.boolean(),
});

export type EncounterObject = Infer<typeof encounter>;

export default defineSchema({
  parties: defineTable(party).index('by_createdBy', ['createdBy']),
  encounters: defineTable(encounter).index('by_createdBy', ['createdBy']),
});
