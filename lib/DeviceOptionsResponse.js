// Copyright (c) 2015, Łukasz Walukiewicz <lukasz@miracle.systems>.
// Licensed under the MIT License <http://opensource.org/licenses/MIT>.
// Part of the node-glp2 project <http://miracle.systems/p/node-glp2>.

'use strict';

var util = require('./util');
var constants = require('./constants');
var Response = require('./Response');

module.exports = DeviceOptionsResponse;

/**
 * @constructor
 * @extends {Response}
 * @param {Array.<string>} deviceOptions
 */
function DeviceOptionsResponse(deviceOptions)
{
  Response.call(this, constants.ResponseType.DEVICE_OPTIONS);

  /**
   * @type {Array.<string>}
   */
  this.deviceOptions = deviceOptions;
}

util.inherits(DeviceOptionsResponse, Response);

/**
 * @param {Buffer} responseBuffer
 * @returns {DeviceOptionsResponse}
 */
DeviceOptionsResponse.fromResponseBuffer = function(responseBuffer)
{
  var deviceOptions = util.decodeResponseBuffer(responseBuffer)
    .join(' ')
    .split('_')
    .filter(function(deviceOption) { return deviceOption.length > 0; });

  return new DeviceOptionsResponse(deviceOptions);
};

/**
 * @returns {number}
 */
DeviceOptionsResponse.prototype.getSoftwareVersion = function()
{
  var versionRe = /^V[0-9]\.[0-9]+$/;

  for (var i = 0; i < this.deviceOptions.length; ++i)
  {
    var option = this.deviceOptions[i];

    if (versionRe.test(option))
    {
      return parseFloat(option.substring(1));
    }
  }

  return NaN;
};
