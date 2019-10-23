const parser = require('../routes/parser/parser');

let firstArticle = "";
parser.getNews("https://vc.ru")
    .then(json => {
        firstArticle = json.articles[0].title
    });

let firstAnotherArticle = "";
parser.getNews("https://www.kommersant.ru")
    .then(json => {
        firstAnotherArticle = json.articles[0].title
    });

module.exports = {
    'News parser main functional testing': function (browser) {
        browser
            .url('https://web-dev-additional.herokuapp.com')
            .waitForElementVisible('body')
            .assert.titleContains('Парсер новостей')
            .assert.visible('input[type=search]')
            .click('input[type=search]')
            .assert.visible('li.vs__dropdown-option')
            .assert.containsText('li.vs__dropdown-option:first-child', 'VC.RU')
            .assert.containsText('li.vs__dropdown-option:last-child', 'Kommersant.ru')
            .click('li.vs__dropdown-option:first-child')
            .assert.visible('ul.news-container > li:first-child')
            .assert.containsText('ul.news-container > li:first-child', firstArticle.trim())
            .end();
    },
    'News parser update button testing': function (browser) {
        browser
            .url('https://web-dev-additional.herokuapp.com')
            .waitForElementVisible('body')
            .assert.titleContains('Парсер новостей')
            .assert.visible('input[type=search]')
            .click('input[type=search]')
            .assert.visible('li.vs__dropdown-option')
            .assert.containsText('li.vs__dropdown-option:first-child', 'VC.RU')
            .assert.containsText('li.vs__dropdown-option:last-child', 'Kommersant.ru')
            .click('li.vs__dropdown-option:last-child')
            .assert.visible('ul.news-container > li:first-child')
            .assert.visible('ul.news-container > li:first-child')
            .assert.containsText('ul.news-container > li:first-child', firstAnotherArticle.trim())
            .assert.visible('button.update-button')
            .click('button.update-button')
            .assert.visible('ul.news-container > li:first-child')
            .assert.containsText('ul.news-container > li:first-child', firstAnotherArticle.trim())
            .end();
    }
};
