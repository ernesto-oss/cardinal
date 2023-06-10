import { SSTConfig } from "sst";
import { Web } from "./stacks/Web";
import { Api } from "./stacks/Api";

export default {
  config(_input) {
    return {
      name: "cardinal-react-sst-trpc",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Api).stack(Web);
  },
} satisfies SSTConfig;
