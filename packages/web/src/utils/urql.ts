// @ts-nocheck
import {
  QueryResult,
  QueryRequest,
  MutationResult,
  MutationRequest,
  generateQueryOp,
  generateMutationOp,
} from "@acme/api/genql";
import {
  createClient,
  cacheExchange,
  fetchExchange,
  useQuery,
  useClient,
  createRequest,
  RequestPolicy,
  OperationResult,
  UseMutationState,
  OperationContext,
  UseMutationResponse,
} from "urql";
import { pipe, toPromise } from "wonka";
import { getGraphqlUrl } from "@/utils/getBaseUrl";

export const urqlClient = createClient({
  url: getGraphqlUrl(),
  exchanges: [cacheExchange, fetchExchange],
});

export function useTypedQuery<Query extends QueryRequest>(opts: {
  query: Query;
  pause?: boolean;
  requestPolicy?: RequestPolicy;
  context?: Partial<OperationContext>;
}) {
  const { query, variables } = generateQueryOp(opts.query);
  return useQuery<QueryResult<Query>>({
    ...opts,
    query,
    variables,
  });
}

export function useTypedMutation<
  Variables extends Record<string, any>,
  Mutation extends MutationRequest,
  Data extends MutationResult<Mutation>,
>(
  builder: (vars: Variables) => Mutation,
  opts?: Partial<OperationContext>,
): UseMutationResponse<Data, Variables> {
  const client = useClient();
  const isMounted = useRef(true);
  const [state, setState] = useState<UseMutationState<Data, Variables>>(initialState);
  const executeMutation = useCallback(
    (
      vars?: Variables,
      context?: Partial<OperationContext>,
    ): Promise<OperationResult<Data, Variables>> => {
      setState({ ...initialState, fetching: true });
      const buildArgs = vars || ({} as Variables);
      const built = builder(buildArgs);
      const { query, variables } = generateMutationOp(built);
      return pipe(
        client.executeMutation<Data, Variables>(createRequest(query, variables as Variables), {
          ...opts,
          ...context,
        }),
        toPromise,
      ).then((result: OperationResult<Data, Variables>) => {
        if (isMounted.current) {
          setState({
            fetching: false,
            stale: !!result.stale,
            data: result.data,
            error: result.error,
            extensions: result.extensions,
            operation: result.operation,
          });
        }
        return result;
      });
    },
    [state, setState],
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return [state, executeMutation];
}
