class Price {
    constructor(buy, sell, id, pair, timestamp) {
        this.buy = buy;
        this.sell = sell;
        this.id = id;
        this.pair = pair;
        this.timestamp = timestamp;
    }

    quote() {
        return this.pair.substring(3);
    }

    toDollars(price) {
        return price / 100;
    }

    mid() {
        return this.toDollars((this.buy + this.sell) / 2);
    }
}