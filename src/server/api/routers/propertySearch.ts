import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const propertySearchRouter = createTRPCRouter({
  getPropertySearchesByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.userId) {
        return null;
      }

      const propertySearches = await ctx.prisma.propertySearch.findMany({
        where: {
          userId: input.userId,
        },
      });
      return propertySearches;
    }),

  create: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        properties: z.array(z.unknown()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const propertySearch = await ctx.prisma.propertySearch.create({
        data: {
          userId: userId,
          properties: input.properties,
        },
      });
      return propertySearch;
    }),
});
