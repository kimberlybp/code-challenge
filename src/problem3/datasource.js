const DATA_ENDPOINT = "https://static.ngnrs.io/test/prices";

class Datasource {
    constructor() {
        this.source = DATA_ENDPOINT;
    }

    getPrices() {
        return fetch(this.source)
            .then(res => {
                return res.json();
            }).then(data => {
                var data = data.data.prices;
                return data.map((p) => new Price(p.buy, p.sell, p.id, p.pair, p.timestamp));
            }).catch(error => {
                return Promise.reject(error);
            });
    }
}

//Testing
const ds = new Datasource();
ds.getPrices()
    .then(prices => {
        prices.forEach(price => {
            console.log(`Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`);
        });
    }).catch(error => {
        console.error(error);
    });