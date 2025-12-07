import { defineSchema, defineTable } from 'convex/server';
import { v, type Infer } from 'convex/values';

const hero = v.object({
  name: v.string(),
  heroes: v.array(
    v.object({
      id: v.string(),
      name: v.string(),
    })
  ),
});

export type HeroObject = Infer<typeof hero>;

export default defineSchema({
  parties: defineTable(hero),
});
