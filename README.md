<p align="center">
  <img src="https://raw.githubusercontent.com/ernesto-oss/cardinal/main/www/src/assets/brand/cardinal-icon.svg" width="100" alt="Cardinal Logo" />
</p>

<h2 align="center">
  create-cardinal-app
</h2>

<p align="center">
  Cardinal is a CLI tool that helps you quickstart a full-stack monorepo project. Get started by running <pre>npm create-cardinal-app@latest</pre> on the terminal.
</>

Cardinal is a CLI tool designed to help you quickstart your next full-stack application on a monorepo project structure. It is the result of painful years having to deal with tedious boilerplate work and making the different moving pieces of a full-stack application actually work together in a monorepo structure.

> **Warning**
> This app is currently a work in progress. I'm building this in public in order to allow possible community contribution during it's early stages.
> Roadmaps will soon be made available on the docs website.

## Core principles

Cardinal tries to solve a specific set of problems. Having a well defined support scope helps the project be easily maintanable and future-proof. Because of this, it's important to know that:

### Typesafety is not optional

TypeScript is considered a core foundation of any template bootstraped by Cardinal, and a lot of effort was put in place to ensure that every template achieves end-to-end typesafety from the server to the client.

### Bring your own batteries

Cardinal isn't trying to prescribe how you should write your applications. While we do have to make some choices on regards to what libraries to use in order to enable some of the chosen paths (eg. data-fetching), we fully expect you to bring your prefered libraries for state management, components, etc.

### Serverless focused deployment paths

Adopting serverless architectures aligns with our vision of removing complexity from your development pipeline whenever possible. We encourage the use of cloud platforms that support serverless deployments so you can spend less time worrying about managing and scaling your application's infrastructure.

## Getting started

To scaffold a new application, just run the `create-cardinal-app` command with the package manager of your choice:

```bash
npm create-cardinal-app@latest
yarn create-cardinal-app@latest
pnpm create-cardinal-app@latest
```

## Docs

You can find detailed information about the available tech stacks, recommendations on how to choose and use your stack, and addtional resources about the included tools [in the docs](https://cardinal.ernestoresende.com/docs/en/introduction).

## License

Licensed under the [MIT license](https://raw.githubusercontent.com/ernesto-oss/cardinal/main/LICENSE.md").
