import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";
import { Post } from "@prisma/client";

export const propertySearchRouter = createTRPCRouter({
  //   getById: publicProcedure
  //     .input(z.object({ id: z.string() }))
  //     .query(async ({ ctx, input }) => {
  //       const post = await ctx.prisma.post.findUnique({
  //         where: { id: input.id },
  //       });

  //       if (!post) throw new TRPCError({ code: "NOT_FOUND" });

  //       return (await addUserDataToPosts([post]))[0];
  //     }),

  //   getAll: publicProcedure.query(async ({ ctx }) => {
  //     const posts = await ctx.prisma.post.findMany({
  //       take: 100,
  //       orderBy: [{ createdAt: "desc" }],
  //     });
  //     return addUserDataToPosts(posts);
  //   }),

  //   getPostsByUserId: publicProcedure
  //     .input(
  //       z.object({
  //         userId: z.string(),
  //       })
  //     )
  //     .query(({ ctx, input }) =>
  //       ctx.prisma.post
  //         .findMany({
  //           where: {
  //             authorId: input.userId,
  //           },
  //           take: 100,
  //           orderBy: [{ createdAt: "desc" }],
  //         })
  //         .then(addUserDataToPosts)
  //     ),

  // create: privateProcedure
  // .input(
  //   z.object({
  //     userId: z.string(),
  //     properties: z.array(z.object({}))
  //   })
  // )
  // .query(async({ ctx, input }) => {
  //   console.log('input: ', input)
  //   // const propertySearch = await ctx.prisma.propertySearch
  //   // .create({data: {
  //   //   userId: input.userId,
  //   //   properties: input.properties
  //   // }})
  //   // const propertySearches = await ctx.prisma.propertySearch
  //   //   .findMany({
  //   //     where: {
  //   //       userId: input.userId,
  //   //     },
  //   //   })
  //   // return propertySearches
  // }),

  getPropertySearchesByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {

      if (!input.userId) {
        return null
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
      console.log("propertySearch: ", propertySearch);
      return propertySearch;
    }),
});
