import { BigNumber } from 'ethers';
import { AccountBalances } from '../account';
import { Position } from '../position';
import { Quote } from '../quote';
import { TradeCollateral, TradeDisabledReason } from '.';
export default function getTradeDisabledReason({ isOpen, owner, size, newSize, quote, position, collateral, balances, quoteTransfer, baseTransfer, }: {
    isOpen: boolean;
    owner: string;
    size: BigNumber;
    newSize: BigNumber;
    quote: Quote;
    position?: Position;
    collateral?: TradeCollateral;
    balances: AccountBalances;
    quoteTransfer: BigNumber;
    baseTransfer: BigNumber;
}): TradeDisabledReason | null;
