export default async function subgraphRequest(client, options) {
    return client.query({ ...options, errorPolicy: 'all' });
}
//# sourceMappingURL=subgraphRequest.js.map