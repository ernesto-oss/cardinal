<p align="center">
  <img src="https://raw.githubusercontent.com/ernesto-oss/cardinal/main/www/src/assets/brand/cardinal-icon.svg" width="100" alt="Cardinal Logo" />
</p>

<h1 align="center">
  create-cardinal-app
</h1>

<p align="center">
  CLI tool that helps you quickstart a full-stack monorepo project. Get started by running <code>npm create-cardinal-app@latest</code> on the terminal.
</>

<div align="center">

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ernesto-oss/cardinal/release.yaml?style=flat-square)
![npm](https://img.shields.io/npm/dm/create-cardinal-app?style=flat-square)
![GitHub](https://img.shields.io/github/license/ernesto-oss/cardinal?style=flat-square)

</div>

---

Cardinal is a CLI tool designed to help you quickstart your next full-stack application on a monorepo project structure. It is the result of painful years having to deal with tedious boilerplate work and making the different moving pieces of a full-stack application stacks actually work together in a monorepo structure.

> **Warning**
> This app is currently a work in progress. I'm building this in public in order to allow possible community contribution during it's early stages.
> Roadmaps will soon be made available on the docs website.

## Core principles

Cardinal tries to solve a specific set of problems: give users a solid foundation for all parts of their full-stack apps (authoring, composition and deployment), on top of Node.js/Typescript based tech stacks. 

Having a well defined support scope helps the project be maintainable and future-proof. Because of this, it's important to know that:

### Typesafety is not optional

TypeScript is considered a core foundation of any template bootstraped by Cardinal, and a lot of effort was put in place to ensure that every template achieves end-to-end typesafety from the server to the client.

### Bring your own batteries

Cardinal isn't trying to prescribe how you should write your applications. While we do have to make some choices on regards to what libraries to use in order to enable some of the chosen paths (eg. data-fetching & deployment), we fully expect you to bring your prefered libraries for state management, components, etc.

### Serverless focused deployment paths

Adopting serverless architectures aligns with our vision of removing complexity from your development pipeline whenever possible. We encourage the use of cloud platforms that support serverless deployments so you can spend less time worrying about managing and scaling your application's infrastructure.

## Getting started

To scaffold a new application, just run the `create-cardinal-app` command with the package manager of your choice:

```bash
pnpm dlx create-cardinal-app@latest
npx create-cardinal-app@latest
```

## Docs

You can find detailed information about the available tech stacks, recommendations on how to choose and use your stack, and addtional resources about the included tools [in the docs](https://cardinal.ernestoresende.com/docs/en/introduction).

## Contribution

Please refer to the [contribution guide](CONTRIBUTION.md) for how to setup the development environment for Cardinal and how to contribute with the project.

## License

Licensed under the [MIT license](https://raw.githubusercontent.com/ernesto-oss/cardinal/main/LICENSE.md").
