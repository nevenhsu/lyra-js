import { ZERO_BN } from '../constants/bn';
import { DataSource } from '../constants/contracts';
import { Version } from '../lyra';
import { Market } from '../market';
import { Strike } from '../strike';
export class Board {
    constructor(lyra, market, boardView, block) {
        this.__source = DataSource.ContractCall;
        this.lyra = lyra;
        this.block = block;
        this.__market = market;
        this.block = block;
        const fields = Board.getFields(market, boardView, block);
        this.id = fields.id;
        this.expiryTimestamp = fields.expiryTimestamp;
        this.timeToExpiry = fields.timeToExpiry;
        this.isExpired = fields.isExpired;
        this.baseIv = fields.baseIv;
        this.spotPriceAtExpiry = fields.spotPriceAtExpiry;
        this.isPaused = fields.isPaused;
        this.tradingCutoffTimestamp = fields.tradingCutoffTimestamp;
        this.timeToTradingCutoff = fields.timeToTradingCutoff;
        this.isTradingCutoff = fields.isTradingCutoff;
        this.params = fields.params;
        this.liveStrikeMap = boardView.strikes.reduce((map, strikeView) => ({
            ...map,
            [strikeView.strikeId.toNumber()]: strikeView,
        }), {});
    }
    // TODO: @dappbeast Remove getFields
    static getFields(market, boardView, block) {
        var _a;
        const id = boardView.boardId.toNumber();
        const expiryTimestamp = boardView.expiry.toNumber();
        const timeToExpiry = Math.max(0, expiryTimestamp - block.timestamp);
        const tradingCutoffTimestamp = expiryTimestamp - market.params.tradingCutoff;
        const timeToTradingCutoff = Math.max(0, tradingCutoffTimestamp - block.timestamp);
        const spotPriceAtExpiry = !boardView.priceAtExpiry.isZero() ? boardView.priceAtExpiry : undefined;
        // Expired flag is determined by priceAtExpiry state being set
        const isExpired = !!spotPriceAtExpiry && timeToExpiry === 0;
        const isTradingCutoff = timeToTradingCutoff === 0;
        const baseIv = !isExpired ? boardView.baseIv : ZERO_BN;
        const isPaused = (_a = boardView.isPaused) !== null && _a !== void 0 ? _a : market.isPaused;
        let varianceGwavIv;
        let forceCloseGwavIv;
        if (market.lyra.version === Version.Avalon) {
            const avalonBoardView = boardView;
            // HACK: use forceCloseGwavIV as varianceGwavIv
            varianceGwavIv = avalonBoardView.forceCloseGwavIV;
            forceCloseGwavIv = avalonBoardView.forceCloseGwavIV;
        }
        else {
            const newportBoardView = boardView;
            varianceGwavIv = newportBoardView.varianceGwavIv;
            forceCloseGwavIv = newportBoardView.forceCloseGwavIv;
        }
        return {
            id,
            expiryTimestamp,
            tradingCutoffTimestamp,
            timeToExpiry,
            timeToTradingCutoff,
            isExpired,
            isTradingCutoff,
            spotPriceAtExpiry,
            baseIv,
            isPaused,
            params: {
                varianceGwavIv,
                forceCloseGwavIv,
                isBoardPaused: boardView.isPaused,
            },
        };
    }
    // Getters
    static async get(lyra, marketAddressOrName, boardId) {
        const market = await Market.get(lyra, marketAddressOrName);
        return await market.board(boardId);
    }
    async refresh() {
        return await Board.get(this.lyra, this.market().address, this.id);
    }
    // Edges
    market() {
        return this.__market;
    }
    strikes() {
        return Object.values(this.liveStrikeMap).map(strikeView => {
            return new Strike(this.lyra, this, strikeView, this.block);
        });
    }
    strike(strikeId) {
        const strikeView = this.liveStrikeMap[strikeId];
        if (!strikeView) {
            throw new Error('Strike does not exist for board');
        }
        return new Strike(this.lyra, this, strikeView, this.block);
    }
    option(strikeId, isCall) {
        const strike = this.strike(strikeId);
        return strike.option(isCall);
    }
    async quote(strikeId, isCall, isBuy, size, options) {
        const board = await this.refresh();
        return board.quoteSync(strikeId, isCall, isBuy, size, options);
    }
    quoteSync(strikeId, isCall, isBuy, size, options) {
        return this.option(strikeId, isCall).quoteSync(isBuy, size, options);
    }
    async quoteAll(size, options) {
        const board = await this.refresh();
        return board.quoteAllSync(size, options);
    }
    quoteAllSync(size, options) {
        return {
            strikes: this.strikes().map(strike => strike.quoteAllSync(size, options)),
            board: this,
        };
    }
}
//# sourceMappingURL=index.js.map