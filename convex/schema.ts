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

export default defineSchema({
  parties: defineTable(party).index('by_createdBy', ['createdBy']),
});
