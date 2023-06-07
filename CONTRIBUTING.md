# Welcome to the Cardinal contributing guide

Thank you for investing your time to contribute to this project!

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing and merging the PR.

## New contributor guide

To get an overview of the project, read the root [README](README.md). Bellow, are some resources that will help you with open source contributions:

- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)
- [pnpm CLI](https://pnpm.io/pnpm-cli);

## What can I contribute with?

Before delving deeper on the collaborarion worflow, let's talk about what kind of contributions can be made. Make sure to refer to the [create-cardinal-app]() to understand how the CLI, installers and template scaffolding works in `create-cardinal-app`.

There are three main things you can usually contribute with:

- **Docs**: If you have any ideas that would improve the documentation for Cardinal (typo correction, fact checking, benchmarks or guides);

- **Templates and installers**: If you would like to add a currently unsupported feature (a new database type, framework, or deployment provider), you'll probably be submitting a new template, installer, and new CLI prompts. Keep in mind that they should not change the underlying dependencies that handle a specific part of the stack (eg.: you should not change Drizzle for other ORM solution for any templates under `templates/database`);

- **Bug fixes/reports**: If you think you've found a bug or unexpected behavior in the CLI application, or the scaffolded apps, you're welcome to raise a issue and/or PR with a bug description/fix.

Ideas for improving the overall architecture of the CLI app will always be welcome, but we ask that you raise a issue and/or a discussion with an overview of the proposed ideas first in order to ensure a proper debate over the proposal.

Be sure to follow the templates for new issues and pull requests when applicable.

## Contribution workflow

### Making changes locally

This project uses `pnpm`, and should be run with Node.js on the latest available LTS version. Ensure you have them properly setup on your development environment before continuing.

- `git clone https://github.com/ernesto-oss/cardinal.git`
- `cd cardinal`

The Cardinal homepage and documentation source-code can be found on `/www` directory. The `create-cardinal-app` application can be found on the `/cli` directory.

Install all the workspace dependencies with: `pnpm install` on the project root.

To quickly run the documentation website after installing all dependencies:

- `pnpm dev:docs`

To quickly setup `create-cardinal-app` for local testing:

- `cd cli` - Make the `/cli` directory your current working directory
- `pnpm dev` - Start the development script which will build `create-cardinal-app` in development mode (non-minified, for easier debugging). 

> **Warning**
> Make a sure to take a look at the `dev` script in `cli/package.json`. The `PACKAGE_MANAGER_OVERRIDE` environment variable is necessary because, by default, execution of global scripts is defered to `npm`, even when they are installed using `pnpm`. Since the scripts in the scaffolded app are the same used to run the `create-cardinal-app` CLI, this will ensure that the scripts inside the scaffolded app use the correct package manager.

- `pnpm link global` - Link the current module to the global pnpm store.

Restart your terminal session or `source` your current terminal configuration file, and it should pickup the global binary for `create-cardinal-app`. You can check if it was correctly installed with `cat ~/.local/share/pnpm/create-cardinal-app`. It should have something similar to this:

```bash
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
   *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -z "$NODE_PATH" ]; then
 export NODE_PATH="<...a bunch of pointers to node_modules...>"
else
 export NODE_PATH="<...a bunch of pointers to node_modules...>:$NODE_PATH"
fi
if [ -x "$basedir/node" ]; then
 exec "$basedir/node"  "$basedir/global/5/node_modules/create-cardinal-app/dist/index.js" "$@"
else
 exec node  "$basedir/global/5/node_modules/create-cardinal-app/dist/index.js" "$@"
fi
```

From here, any changes to the `/cli` source-code will reflect the behavior of the `create-cardinal-app` binary. We recommend that you setup a `cardinal-test-apps` or any similar directory where you can securely scaffold the apps and test prompt combinations.

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

- Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge. Once you submit your PR, a team member will review your proposal. We may ask questions or request for additional information.  
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.  
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).  
- If you run into any merge issues, checkout this [git tutorial](https://lab.github.com/githubtraining/managing-merge-conflicts) to help you resolve merge conflicts and other issues.

It is possible that your pull request is denied if it does not align with our current development goals, but we'll try our best to make sure you receive feedback with detailed information as to why it may have been rejected.

### Your PR is merged!

Congratulations :tada::tada: The community of Cardinal maintainers and users thanks you :sparkles:.

Once your PR is merged, your contributions will be included in the next release.

## Credits

This CONTRIBUTING.md file was modelled after the [github/docs CONTRIBUTING.md](https://github.com/github/docs/blob/main/CONTRIBUTING.md) file, and we thank the original author.