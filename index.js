'use strict';

const cheerio = require('cheerio');
const http = require('http');
const Url = require('url');

const RegexCrawler = function(){
};

RegexCrawler.prototype.testPattern = function(text, pattern){
    return pattern.test(text);
};

RegexCrawler.prototype.getDom = function(html, query){
    return cheerio(html, query);
};

RegexCrawler.prototype.fetchHtml = function(url, next){

    let urlParts = Url.parse(url, true);

    let options = {
        host: urlParts.hostname,
        port: urlParts.port || 80,
        path: urlParts.path
    };
    let request = http.request(options, function (res) {
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            next(null, data.toString());

        });
    });
    request.on('error', function (e) {
        console.error(e.message);
    });
    request.end();
};

RegexCrawler.prototype.testInnerHtml = function(url, query, pattern, next){
    this.fetchHtml(url, (html) => {
        let dom = this.getDom(html, query);
        let success = false;
        for(let elem of dom){
            success = this.testPattern(elem.text(), pattern);
            if (success) {
                break;
            }
        }

        next(null, success);
    });
};

module.exports = RegexCrawler;