import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('parties').collect();
  },
});

export const post = mutation({
  args: {
    name: v.string(),
    heroes: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('parties', args);
  },
});

export const deleteParty = mutation({
  args: {
    id: v.id('parties'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const patchParty = mutation({
  args: {
    id: v.id('parties'),
    name: v.string(),
    heroes: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      name: args.name,
      heroes: args.heroes,
    });
  },
});
