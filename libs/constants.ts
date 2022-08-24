export const GET_BLOCK_WITH_VALIDATOR = `
query GetBlockWithValidator($blockHash: String!) {
  app_blocks(where: {hash: {_eq: $blockHash}}) {
    id
    hash
    created_at
    validator
  }
}
`;
