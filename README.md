# Cardinal

An open-source template for fullstack application projects built with **TurboRepo**, **Next.js** and **GraphQL**.

> **Warning**
> This template is still a work in progress. I'm still figuring out some quirks and complicated bits.

## About

This is an relatively opinionated template for monorepo projects that want to use both Next.js as a client application layer and GraphQL API’s from the same project structure, leveraging Vercel’s (or similar IaaS providers) serverless capabilities for the GraphQL endpoint.

## Features

- **Monorepo project structure** featuring the latest features from TurboRepo (remote caching, parallel execution, shared local modules and more);
- **Next.js applications** for both a **user platform** and a **marketing website;**
- GraphQL API endpoint served from Next.js application using **Nexus**;
- Smart codegen for typesafe contracts between client and server with **GraphQL Codegen**;
- Data fetching, caching and mutations on the client with **React Query**;
- Authentication layer with **NextAuth.js**;

## Who is this template for

This template is a good fit for new projects who want to start in the right track with a GraphQL API operating in a serverless environment and a monorepo setup for shared modules between several client applications.

This template assumes some sane defaults for that use case, but will in no way block you from extending it as you see fit, even if only some parts of it’s coverage interest you.

## Getting started

To get the project running:

1. Install dependencies:

```bash
pnpm i
```

2. Copy the .env.example file to a local .env

```bash
cp .env.example .env
```

3. Push the Prisma schema do the database and generate the Prisma Client (the project is configured to use a local database file with `sqlite`. You can change that to the database provider of your choice in the Prisma configuration).

```bash
pnpm db-push
```

4. You can now run the project:

```bash
pnpm dev
```

## FAQ

### Q: Why is `x` tech in here?

Because it tries to solves a specific problem. If it’s not to your liking, replace it on your local instance, or use another template.

### Q: No tests?

Nope. Bring your own tests;

### Q: Can I add `x` library to this?

Sure. After you clone it you can bring your favorite styling/state management/component primitives; Whatever you need to build your application!

### Q: But I strongly believe that GraphQL is deeply flawed and I prefer to use `x` instead!

Then, this starter is not for you, and that’s fine :)

### Q: I don’t think my project will benefit from GraphQL, but I still want to build API’s on a serverless environment. Can you recommend me something else?

Sure. The community over at t3-oss has some really good templates if you’re looking to use tRPC instead of GraphQL, with both create-t3-app for a standalone Next.js app, and create-t3-turbo for a monorepo setup similar to this one. If you’re thinking on giving tRPC a spin, go check them out.

Licensed under the [MIT license]().


