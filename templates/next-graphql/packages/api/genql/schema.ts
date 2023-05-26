// @ts-nocheck
export type Scalars = {
    DateTime: any,
    String: string,
    Boolean: boolean,
}

export interface Query {
    greeting: Scalars['String']
    protected: Scalars['String']
    __typename: 'Query'
}

export interface QueryGenqlSelection{
    greeting?: boolean | number
    protected?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    