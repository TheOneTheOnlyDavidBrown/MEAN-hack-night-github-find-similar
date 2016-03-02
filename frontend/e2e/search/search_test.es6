/* global describe, beforeEach, it, browser */
'use strict';

import SearchPage from './search.po';

let chai = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect = chai.expect;

chai.use(chaiAsPromised);

describe('Search page', () => {
  let searchPage;

  beforeEach(() => {
    searchPage = new SearchPage();
    browser.get('/#/search');
  });

  it('should say SearchCtrl', () => {
    expect(searchPage.heading.getText()).to.eventually.equal('search');
    expect(searchPage.text.getText()).to.eventually.equal('SearchCtrl');
  });
});
