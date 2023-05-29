import { OptionType } from '../constants/contracts';
export default function getIsCall(optionType) {
    return [OptionType.LongCall, OptionType.ShortCoveredCall, OptionType.ShortCall].includes(optionType);
}
//# sourceMappingURL=getIsCall.js.map