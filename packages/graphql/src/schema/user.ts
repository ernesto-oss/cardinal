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
  }),
});

builder.queryField("myUser", (t) =>
  t.prismaField({
    description: "Returns information about the currently authenticated user",
    type: "User",
    authScopes: {
      authorizedUser: true,
    },
    nullable: true,
    resolve: (query, _root, _args, ctx) => {
      const id = ctx.session?.user?.id as string;
      const user = prisma.user.findUnique({
        ...query,
        where: { id: id },
      });

      return user;
    },
    unauthorizedResolver: () => null,
  }),
);
