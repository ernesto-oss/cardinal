import { prisma } from "@acme/database";
import { builder } from "../builder";

builder.prismaNode("User", {
  id: { field: "id" },
  fields: (t) => ({
    name: t.exposeString("name", { nullable: true }),
    email: t.exposeString("email", { nullable: true }),
    emailVerified: t.expose("emailVerified", {
      type: "DateTime",
      nullable: true,
    }),
    image: t.exposeString("image", { nullable: true }),
    // posts: t.relatedConnection("posts", { cursor: "id" }),
    // accounts: t.relatedConnection("accounts", { cursor: "id" }),
  }),
});

builder.queryType({
  fields: (t) => ({
    user: t.prismaField({
      type: "User",
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (query, _root, args) => {
        const id = args.id as string;
        const user = prisma.user.findUnique({
          ...query,
          where: { id: id },
        });

        return user;
      },
    }),
  }),
});
