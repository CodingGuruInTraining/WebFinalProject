var request = require('request');

var baseURL = "http://ron-swanson-quotes.herokuapp.com/v2/quotes/";

function quoteRequest(callback) {
    var hundred = 100;
    var queryParam = {};

    request({url: baseURL + 1, qs: queryParam}, function (error, quote_response, body) {
        if (!error && quote_response.statusCode == 200) {
            var quoteJSON = JSON.parse(body);
            callback(quoteJSON);
        }
    });
}

module.exports = quoteRequest;