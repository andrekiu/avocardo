// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req, operation, name) => {
  const { body } = req;
  return body.query.indexOf(`${operation} ${name}Query`) == 0;
};

// Alias query if operationName matches
export const aliasQuery = (req, operationName) => {
  if (hasOperationName(req, "query", operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

// Alias mutation if operationName matches
export const aliasMutation = (req, operationName) => {
  if (hasOperationName(req, "mutation", operationName)) {
    req.alias = `gql${operationName}Mutation`;
  }
};
