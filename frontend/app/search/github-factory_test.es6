/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Github', () => {
  let factory;

  beforeEach(module('search'));

  beforeEach(inject((Github) => {
    factory = Github;
  }));

  it('should have someValue be Github', () => {
    expect(factory.someValue).to.equal('Github');
  });

  it('should have someMethod return Github', () => {
    expect(factory.someMethod()).to.equal('Github');
  });
});
