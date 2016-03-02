/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('SearchCtrl', () => {
  let ctrl;

  beforeEach(module('search'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('SearchCtrl');
  }));

  it('should have ctrlName as SearchCtrl', () => {
    expect(ctrl.ctrlName).to.equal('SearchCtrl');
  });
});
