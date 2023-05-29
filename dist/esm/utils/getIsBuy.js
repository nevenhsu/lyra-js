import getIsLong from './getIsLong';
export default function getIsBuy(optionType, isOpen) {
    const isLong = getIsLong(optionType);
    return (isLong && isOpen) || (!isLong && !isOpen);
}
//# sourceMappingURL=getIsBuy.js.map