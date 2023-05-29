import { OptionType } from '../constants/contracts';
export default function getIsLong(optionType) {
    return [OptionType.LongCall, OptionType.LongPut].includes(optionType);
}
//# sourceMappingURL=getIsLong.js.map