/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Backend', () => {
  let factory;

  beforeEach(module('search'));

  beforeEach(inject((Backend) => {
    factory = Backend;
  }));

  it('should have someValue be Backend', () => {
    expect(factory.someValue).to.equal('Backend');
  });

  it('should have someMethod return Backend', () => {
    expect(factory.someMethod()).to.equal('Backend');
  });
});
