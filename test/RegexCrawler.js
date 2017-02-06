'use strict';
const assert = require('assert');
const RegexCrawler = require('../index.js');

describe('RegexCrawler', function() {
    describe('#testPattern()', function() {

        it('should detect pattern', function() {
            let crawler = new RegexCrawler();
            assert.equal(true, crawler.testPattern('Test pattern', /^Test pattern$/));
            assert.equal(true, crawler.testPattern('Test pattern', /^Test/));
            assert.equal(true, crawler.testPattern('Test pattern', /pattern$/));

            assert.equal(true, crawler.testPattern('Test pattern', /Test/));
            assert.equal(true, crawler.testPattern('Test pattern', /pattern/));
        });
    });

    describe('#getDom()', function() {
        it('should crawl dom', function() {
            let crawler = new RegexCrawler();
            let list = crawler.getDom('<book><title>Book title</title></book>', 'book > title');
            assert.equal('Book title', list.text());
        });
    });

    describe('#fetchHtml()', function() {

        it('should fetch html', function() {
            let crawler = new RegexCrawler();
            let url = 'https://gist.githubusercontent.com/djaney/632f230a77f7ea8eff635d1bc93671f2/raw/01043d84c25ff122f8450195ee1364c73be1ce00/dummpy_for_unit_test.txt'
            crawler.fetchHtml(url, ((err, text) => {
                assert.equal('Used for unit test', text);
            }));

        });
    });

    describe('#testInnerHtml()', function() {

        it('should fetch html, search dom and matchs string', function() {
            let crawler = new RegexCrawler();
            let url = 'https://gist.githubusercontent.com/djaney/bb4103ac4a1f287b4dda75684c4eb044/raw/c2f2112f95da1f16873f09298e86160cd609c304/dummy_html.html'
            let text = crawler.testInnerHtml(url, 'html > body > h1', /^used for/i, ((err, success) => {
                assert.equal(true, success);
            }));

        });
    });
});
