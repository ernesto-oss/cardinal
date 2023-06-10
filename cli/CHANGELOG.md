# create-cardinal-app

## 0.2.0

### Minor Changes

- [#10](https://github.com/ernesto-oss/cardinal/pull/10) [`ac3b36e`](https://github.com/ernesto-oss/cardinal/commit/ac3b36e5ea4286cb99d0906e636bbc831d457a2b) Thanks [@ernestoresende](https://github.com/ernestoresende)! - (cli) add root installer for dotfiles and root monorepo scaffolding

- [#10](https://github.com/ernesto-oss/cardinal/pull/10) [`e1d08a6`](https://github.com/ernesto-oss/cardinal/commit/e1d08a6e8212405b13e16811cd3c0f45be7d9ab0) Thanks [@ernestoresende](https://github.com/ernestoresende)! - (cli) add nextjs installer

- [#10](https://github.com/ernesto-oss/cardinal/pull/10) [`fd5ee44`](https://github.com/ernesto-oss/cardinal/commit/fd5ee444f5936c54db1e4c624787068b85db7570) Thanks [@ernestoresende](https://github.com/ernestoresende)! - (cli) add graphql installer

- [#10](https://github.com/ernesto-oss/cardinal/pull/10) [`1633ccf`](https://github.com/ernesto-oss/cardinal/commit/1633ccfc1b94a0d68b551b025137e54c37becf3e) Thanks [@ernestoresende](https://github.com/ernestoresende)! - (cli) add config installer for `@t3-oss/env` environment variables validation

- [#10](https://github.com/ernesto-oss/cardinal/pull/10) [`db35a36`](https://github.com/ernesto-oss/cardinal/commit/db35a36390e212141fe38a442a4d259680010a8d) Thanks [@ernestoresende](https://github.com/ernestoresende)! - (cli) add database installer for planetscale

### Patch Changes

- [#10](https://github.com/ernesto-oss/cardinal/pull/10) [`b45fe68`](https://github.com/ernesto-oss/cardinal/commit/b45fe6879e838e639702808bc87db619f532abf8) Thanks [@ernestoresende](https://github.com/ernestoresende)! - (docs): update contribution guides

- [#10](https://github.com/ernesto-oss/cardinal/pull/10) [`840339b`](https://github.com/ernesto-oss/cardinal/commit/840339ba6bfcb18f9a787ecc7da9a5d03ce1c1c9) Thanks [@ernestoresende](https://github.com/ernestoresende)! - (cli) improved prompts with more expressive copy, hints, and links to documentation

- [#10](https://github.com/ernesto-oss/cardinal/pull/10) [`9cdf152`](https://github.com/ernesto-oss/cardinal/commit/9cdf152edea2238791c6d52b8f572d05fa161b0b) Thanks [@ernestoresende](https://github.com/ernestoresende)! - place the MIT license on the root of `/cli` in order for it to be correctly bundled within the package on npm

- [#10](https://github.com/ernesto-oss/cardinal/pull/10) [`798d17d`](https://github.com/ernesto-oss/cardinal/commit/798d17d4e720169c01965ae8d74290a0a0fd98b8) Thanks [@ernestoresende](https://github.com/ernestoresende)! - (cli) add hint helpers for additional context during CLI usage

## 0.1.2

### Patch Changes

- 291ce73: enable edge runtime on applicable route segments (credentials route handler and dynamic app pages)
- 4a05191: (next-graphql-vercel) move authentication redirects to nextjs middleware
- 0f4b155: (cli) reset `/templates` directory to rebuild template structure for the cli app
- 291ce73: rename `next-graphql` to `next-graphql-vercel` to include deployment prefix

## 0.1.1

### Patch Changes

- updated `next-graphql` with fixes to credentials and GraphQL handler. Requests to internal API's will be set to `no-cache` as default

## 0.1.0

### Minor Changes

- d3d8756: Initialize release cycle
