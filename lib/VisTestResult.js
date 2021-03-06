// Copyright (c) 2015, Łukasz Walukiewicz <lukasz@miracle.systems>.
// Licensed under the MIT License <http://opensource.org/licenses/MIT>.
// Part of the node-glp2 project <http://miracle.systems/p/node-glp2>.

'use strict';

var util = require('./util');
var constants = require('./constants');
var TestResult = require('./TestResult');

module.exports = VisTestResult;

/**
 * @constructor
 * @extends {TestResult}
 * @param {number} stepNumber
 * @param {string} label
 * @param {boolean} evaluation
 */
function VisTestResult(stepNumber, label, evaluation)
{
  TestResult.call(this, 'VIS', stepNumber, label, evaluation);
}

util.inherits(VisTestResult, TestResult);

/**
 * @param {string} testMethod
 * @param {number} stepNumber
 * @param {Array.<string>} data
 * @returns {VisTestResult}
 */
VisTestResult.fromResponseData = function(testMethod, stepNumber, data)
{
  var extraData = (data.shift() || '').split('_');
  var evaluation = extraData.shift() === constants.TestEvaluation.SUCCESS;
  var label = util.decodeStringValue(extraData.join('_'));

  return new VisTestResult(stepNumber, label, evaluation);
};
