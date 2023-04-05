import { StackContext, Api as ApiGateway } from "sst/constructs";

export function Api({ stack }: StackContext) {
  const api = new ApiGateway(stack, "api", {
    routes: {
      "ANY /trpc/{proxy+}": "packages/api/src/trpc.handler",
    }
  })

  stack.addOutputs({
    API: api.url
  })

  return api;
}
