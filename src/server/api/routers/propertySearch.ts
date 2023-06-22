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

  getPropertySearchesByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      console.log('input: ', input)
      const propertySearches = ctx.prisma.propertySearch
        .findMany({
          where: {
            userId: input.userId,
          },
        })
      console.log('property searches: ', propertySearches)
    }),

//   create: privateProcedure
//     .input(
//       z.object({
//         content: z.string().emoji("Only emojis are allowed").min(1).max(280),
//       })
//     )
//     .mutation(async ({ ctx, input }) => {
//       const authorId = ctx.userId;

//       const { success } = await ratelimit.limit(authorId);

//       if (!success)
//         throw new TRPCError({
//           code: "TOO_MANY_REQUESTS",
//           message: "Bruh, you are making way too many requests!",
//         });

//       const post = await ctx.prisma.post.create({
//         data: {
//           authorId,
//           content: input.content,
//         },
//       });

//       return post;
//     }),
});
