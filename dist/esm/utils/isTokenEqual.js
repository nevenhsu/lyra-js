export default function isTokenEqual(token, tokenAddressOrName) {
    return (token.address.toLowerCase() === tokenAddressOrName.toLowerCase() ||
        token.symbol.toLowerCase() === tokenAddressOrName.toLowerCase());
}
//# sourceMappingURL=isTokenEqual.js.map