import { OptionType } from '../constants/contracts';
export default function getIsBaseCollateral(optionType) {
    return optionType === OptionType.ShortCoveredCall;
}
//# sourceMappingURL=getIsBaseCollateral.js.map