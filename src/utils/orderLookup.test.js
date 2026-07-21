import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEmailInput, getOrderLookupErrorMessage } from './orderLookup.js';

test('validateEmailInput rejects empty and malformed emails', () => {
  assert.equal(validateEmailInput(''), 'Please enter a valid email address.');
  assert.equal(validateEmailInput('abc'), 'Please enter a valid email address.');
  assert.equal(validateEmailInput('abc@example.com'), '');
});

test('getOrderLookupErrorMessage maps network and API errors to helpful messages', () => {
  assert.equal(getOrderLookupErrorMessage({ message: 'Failed to fetch' }), 'Unable to connect to the server. Please try again in a moment.');
  assert.equal(getOrderLookupErrorMessage({ status: 404 }), 'No orders found for this email.');
  assert.equal(getOrderLookupErrorMessage({ status: 500 }), 'The server is currently unavailable. Please try again shortly.');
  assert.equal(getOrderLookupErrorMessage({ message: 'Email is required to lookup orders' }), 'Please enter a valid email address.');
});
