// @ts-nocheck
import { ScalarsEnumsHash, Schema, SchemaUnionsKey } from "gqty";
import {
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLUnionType,
  isEnumType,
  isObjectType,
  isScalarType,
  isUnionType,
} from "graphql";

function filteredTypes(types: readonly GraphQLNamedType[]) {
  return types.filter((type) => !type.name.startsWith("__"));
}

export function createScalarsEnumsHash(schema: GraphQLSchema) {
  const scalarsEnumsHash: ScalarsEnumsHash = {};

  filteredTypes(schema.toConfig().types).forEach((type) => {
    if (isScalarType(type) || isEnumType(type)) {
      scalarsEnumsHash[type.name] = true;
    }
  });

  return scalarsEnumsHash;
}

export function createGeneratedSchema(schema: GraphQLSchema) {
  const generatedSchema: Schema = {
    query: {
      __typename: { __type: "String!" },
    },
    mutation: {
      __typename: { __type: "String!" },
    },
    subscription: {
      __typename: { __type: "String!" },
    },
    [SchemaUnionsKey]: {},
  };

  filteredTypes(schema.toConfig().types).forEach((type) => {
    if (
      type.name === "Query" ||
      type.name === "Mutation" ||
      type.name === "Subscription"
    ) {
      type.name = type.name.toLowerCase();
    }

    if (isUnionType(type)) {
      generatedSchema[type.name as string] = {
        __typename: { __type: "String!" },
        $on: { __type: `$${type.name}!` },
      };

      generatedSchema[SchemaUnionsKey][type.name] = (type as GraphQLUnionType)
        .getTypes()
        .map((value) => value.name);
    } else if (isObjectType(type)) {
      generatedSchema[type.name] = {
        __typename: { __type: "String!" },
      };

      Object.values((type as GraphQLObjectType).getFields()).forEach(
        (field) => {
          generatedSchema[type.name][field.name] = {
            __type: field.type.toString(),
          };

          if (field.args.length > 0) {
            generatedSchema[type.name][field.name].__args = {};
            field.args.forEach((arg) => {
              generatedSchema[type.name][field.name].__args[arg.name] =
                arg.type.toString();
            });
          }
        },
      );
    }
  });

  return generatedSchema;
}
