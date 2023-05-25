> **Warning**
> This template is a stub template for create-cardinal-app package.

## About

This is a stub template to test the base React + Vite implementation. It is used to test the template implementation for `create-cardinal-app` package. It's not optimized for standalone usage, but you can if you wish.

## Features
- Deployment on AWS with SST;
- tRPC API on Lambda with SST;
- Tailwind for styling;

## Getting started

For this setup, you will need to have AWS Credentials available for SST, [see the SST Docs](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file):  

Install dependencies:

```bash
pnpm install
```

Run pnpm dev` script from the root. The first time running the command will take around 5 minutes, as SST will provision the necessary resources on your AWS account in order to run the Live Lambda for the tRPC routes and deploy the React application.

---

Built with ❤ by Ernesto Resende.

Licensed under the [MIT license](https://github.com/ernestoresende/cardinal/blob/main/LICENSE.md).
