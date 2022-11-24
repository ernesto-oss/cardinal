import { prisma } from "../index";

async function seed() {
  await prisma.user.create({
    data: {
      email: "cardinal@cardinal.com",
      name: "Cardinal",
      posts: {
        create: [
          {
            title: "Hello from Cardinal",
            content:
              "This post was created by the seed script and it's being persisted in the database!",
          },
          {
            title: "Try it yourself!",
            content:
              "Log in with any of the oAuth adapters and try writing a post. You should see it here in the page as it gets persisted on the database.",
          },
        ],
      },
    },
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
