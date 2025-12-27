import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { creature } from './schema';

export const getEncounters = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    return await ctx.db
      .query('encounters')
      .withIndex('by_createdBy', (q) => q.eq('createdBy', identity.subject))
      .collect();
  },
});

export const createEncounter = mutation({
  args: {
    name: v.string(),
    creatures: v.array(creature),
    round: v.number(),
    activeCreatureId: v.string(),
    inProgress: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    return await ctx.db.insert('encounters', {
      ...args,
      createdBy: identity.subject,
      updatedAt: Date.now(),
    });
  },
});

export const updateEncounterName = mutation({
  args: {
    id: v.id('encounters'),
    name: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    if (identity.subject !== args.createdBy) {
      throw new Error('Prevented illegal update');
    }

    return await ctx.db.patch(args.id, {
      name: args.name,
      updatedAt: Date.now(),
    });
  },
});

export const updateEncounterTurn = mutation({
  args: {
    id: v.id('encounters'),
    round: v.number(),
    activeCreatureId: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, { round, id, createdBy, activeCreatureId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    if (identity.subject !== createdBy) {
      throw new Error('Prevented illegal update');
    }

    return await ctx.db.patch(id, {
      round,
      activeCreatureId,
      updatedAt: Date.now(),
    });
  },
});

export const setActiveCreatureId = mutation({
  args: {
    id: v.id('encounters'),
    activeCreatureId: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, { id, createdBy, activeCreatureId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    if (identity.subject !== createdBy) {
      throw new Error('Prevented illegal update');
    }

    return await ctx.db.patch(id, {
      activeCreatureId,
      updatedAt: Date.now(),
    });
  },
});

export const resetEncounter = mutation({
  args: {
    id: v.id('encounters'),
    createdBy: v.string(),
    creatures: v.array(creature),
  },
  handler: async (ctx, { id, createdBy, creatures }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    if (identity.subject !== createdBy) {
      throw new Error('Prevented illegal update');
    }

    return await ctx.db.patch(id, {
      activeCreatureId: '',
      round: 1,
      creatures,
      updatedAt: Date.now(),
      inProgress: false,
    });
  },
});

export const startEncounter = mutation({
  args: {
    id: v.id('encounters'),
    createdBy: v.string(),
    activeCreatureId: v.string(),
  },
  handler: async (ctx, { id, createdBy, activeCreatureId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    if (identity.subject !== createdBy) {
      throw new Error('Prevented illegal update');
    }

    return await ctx.db.patch(id, {
      activeCreatureId,
      round: 1,
      updatedAt: Date.now(),
      inProgress: true,
    });
  },
});

export const addCreatures = mutation({
  args: {
    id: v.id('encounters'),
    creatures: v.array(creature),
    createdBy: v.string(),
  },
  handler: async (ctx, { id, createdBy, creatures }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Failed to fetch user information');
    }

    if (identity.subject !== createdBy) {
      throw new Error('Prevented illegal update');
    }

    return await ctx.db.patch(id, {
      creatures,
      updatedAt: Date.now(),
    });
  },
});

export const deleteEncounter = mutation({
  args: {
    id: v.id('encounters'),
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
