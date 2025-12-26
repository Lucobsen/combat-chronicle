import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    return await ctx.db
      .query('parties')
      .withIndex('by_createdBy', (q) => q.eq('createdBy', identity.subject))
      .collect();
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
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    return await ctx.db.insert('parties', {
      ...args,
      createdBy: identity.subject,
      updatedAt: Date.now(),
    });
  },
});

export const deleteParty = mutation({
  args: {
    id: v.id('parties'),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    if (identity.subject !== args.createdBy) return;

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
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    if (identity.subject !== args.createdBy) {
      throw new Error('Prevented illegal patch');
    }

    return await ctx.db.patch(args.id, {
      name: args.name,
      heroes: args.heroes,
      updatedAt: Date.now(),
    });
  },
});
