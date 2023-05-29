import { OptionType } from '../constants/contracts';
export default function getOptionType(isCall, isLong, isBaseCollateral) {
    if (isCall) {
        return isLong ? OptionType.LongCall : isBaseCollateral ? OptionType.ShortCoveredCall : OptionType.ShortCall;
    }
    else {
        return isLong ? OptionType.LongPut : OptionType.ShortPut;
    }
}
//# sourceMappingURL=getOptionType.js.map