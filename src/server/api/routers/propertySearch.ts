// import { clerkClient } from "@clerk/nextjs";
// import { TRPCError } from "@trpc/server";
// import { z } from "zod";
// import {
//   createTRPCRouter,
//   privateProcedure,
//   publicProcedure,
// } from "~/server/api/trpc";
// import { filterUserForClient } from "~/server/helpers/filterUserForClient";

// export const propertySearchRouter = createTRPCRouter({
//   create: privateProcedure
//     .input(
//       z.object({
//         location: z.string(),
//         checkIn: z.string(),
//         checkOut: z.string(),
//         numOfPeople: z.number(),
//       })
//     )
//     .mutation(async ({ ctx, input }) => {
//       const userId = ctx.userId;
//       console.log("input: ", input);
//       console.log("userId: ", userId);

//       const propertySearch = await ctx.prisma.post.create({
//         data: {
//           location: input.location,
//           checkIn: input.checkIn,
//           checkOut: input.checkOut,
//           numOfPeople: input.numOfPeople,
//         }
//       })
      //   const { success } = await ratelimit.limit(userId);

      //   if (!success)
      //     throw new TRPCError({
      //       code: "TOO_MANY_REQUESTS",
      //       message: "Bruh, you are making way too many requests!",
      //     });

      //   const post = await ctx.prisma.post.create({
      //     data: {
      //       authorId,
      //       content: input.content,
      //     },
      //   });

      //   return post;
//     }),
// });
//   getMatchingProperties: publicProcedure
//     .input(
// z.object({
//   location: z.string(),
//   checkIn: z.date(),
//   checkOut: z.date(),
//   adults: z.number(),
// })
//     )
//     .query(async ({ ctx, input }) => {
//       console.log("input: ", input);
//     }),
//   .input(z.object({
//             location: z.string(),
//             checkIn: z.date(),
//             checkOut: z.date(),
//             adults: z.number(),
//           }))
//   .query(async ({ ctx, input }) => {
//     console.log('input: ', input)

//     return filterUserForClient(user);
//   }),
// });
