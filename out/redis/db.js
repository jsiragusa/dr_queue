"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseList = parseList;
exports.pop = pop;
exports.push = push;
exports.popLeft = popLeft;
exports.popRight = popRight;
exports.pushLeft = pushLeft;
exports.pushRight = pushRight;
exports.hasNext = hasNext;
exports.range = range;
exports.lastOne = lastOne;
exports.firstOne = firstOne;
exports.length = length;
exports.reset = reset;
exports.last = last;
exports.first = first;
exports.pause = pause;
exports.delay = delay;
exports.clearDelay = clearDelay;

var _lodash = _interopRequireDefault(require("lodash"));

var _server = require("../server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const DB_CONSTANTS = {
  LEFT: 0,
  RIGHT: 1
};

function getJsonString(data) {
  if (typeof data === 'object') return JSON.stringify(data);else return data;
}

function parseResult(result) {
  if (result.match(/^"/)) return Promise.resolve(JSON.parse(result));else if (result) return Promise.resolve(result);else return Promise.resolve();
}

function parseList() {
  let item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[]';
  return Promise.resolve(item);
}

function pop(_x, _x2) {
  return _pop.apply(this, arguments);
}

function _pop() {
  _pop = _asyncToGenerator(function* (ctx, queueName) {
    return new Promise(resolve => {
      _server.dbs.client.rpop(queueName, (err, data) => {
        resolve(parseResult(data));
      });
    }).catch(_server.log);
  });
  return _pop.apply(this, arguments);
}

function push() {
  return _push.apply(this, arguments);
}

function _push() {
  _push = _asyncToGenerator(function* () {
    let queueName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bad-queue';
    let item = arguments.length > 1 ? arguments[1] : undefined;
    let direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DB_CONSTANTS.LEFT;
    return new Promise(resolve => _server.dbs.client[direction > 0 ? 'rpush' : 'lpush'](queueName, getJsonString(item), (err, data) => resolve(data))).catch(_server.log);
  });
  return _push.apply(this, arguments);
}

function popLeft(_x3) {
  return _popLeft.apply(this, arguments);
}

function _popLeft() {
  _popLeft = _asyncToGenerator(function* (queueName) {
    return new Promise(resolve => {
      _server.dbs.client.lpop(queueName, (err, data) => {
        resolve(parseResult(data));
      });
    }).catch(_server.log);
  });
  return _popLeft.apply(this, arguments);
}

function popRight(_x4) {
  return _popRight.apply(this, arguments);
}

function _popRight() {
  _popRight = _asyncToGenerator(function* (queueName) {
    return pop(queueName);
  });
  return _popRight.apply(this, arguments);
}

function pushLeft(_x5, _x6) {
  return _pushLeft.apply(this, arguments);
}

function _pushLeft() {
  _pushLeft = _asyncToGenerator(function* (queueName, item) {
    let direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DB_CONSTANTS.LEFT;
    return push(queueName, item, direction);
  });
  return _pushLeft.apply(this, arguments);
}

function pushRight(_x7, _x8) {
  return _pushRight.apply(this, arguments);
}

function _pushRight() {
  _pushRight = _asyncToGenerator(function* (queueName, item) {
    let direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DB_CONSTANTS.RIGHT;
    return push(queueName, item, direction);
  });
  return _pushRight.apply(this, arguments);
}

function hasNext(_x9) {
  return _hasNext.apply(this, arguments);
}

function _hasNext() {
  _hasNext = _asyncToGenerator(function* (queueName) {
    return new Promise(resolve => _server.dbs.client.lrange(queueName, -1, -1,
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (err, data) {
        resolve(Promise.resolve(true) || Promise.resolve());
      });

      return function (_x20, _x21) {
        return _ref.apply(this, arguments);
      };
    }()));
  });
  return _hasNext.apply(this, arguments);
}

function range(_x10, _x11, _x12) {
  return _range.apply(this, arguments);
}

function _range() {
  _range = _asyncToGenerator(function* (queueName, start, stop) {
    return new Promise(resolve => _server.dbs.client.lrange(queueName, start, stop, (err, data) => resolve((data && Array.isArray(data) ? data : []).filter(item => item.match(/\{"/g)).map(JSON.parse))));
  });
  return _range.apply(this, arguments);
}

function lastOne(_x13) {
  return _lastOne.apply(this, arguments);
}

function _lastOne() {
  _lastOne = _asyncToGenerator(function* (queueName) {
    let count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return _lodash.default.get((yield range(queueName, 0, count - 1)), '[0]');
  });
  return _lastOne.apply(this, arguments);
}

function firstOne(_x14) {
  return _firstOne.apply(this, arguments);
}

function _firstOne() {
  _firstOne = _asyncToGenerator(function* (queueName) {
    let count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return _lodash.default.get((yield range(queueName, count * -1, -1)).reverse(), '[0]');
  });
  return _firstOne.apply(this, arguments);
}

function length(_x15) {
  return _length.apply(this, arguments);
}

function _length() {
  _length = _asyncToGenerator(function* (queueName) {
    return new Promise(resolve => _server.dbs.client.llen(queueName, (err, data) => resolve(data))).catch(_server.log);
  });
  return _length.apply(this, arguments);
}

function reset(_x16) {
  return _reset.apply(this, arguments);
}

function _reset() {
  _reset = _asyncToGenerator(function* (queueName) {
    return new Promise(resolve => _server.dbs.client.del(queueName, 0, -1, (err, data) => resolve(data))).catch(_server.log);
  });
  return _reset.apply(this, arguments);
}

function last(_x17) {
  return _last.apply(this, arguments);
}

function _last() {
  _last = _asyncToGenerator(function* (queueName) {
    let count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return yield range(queueName, 0, count - 1);
  });
  return _last.apply(this, arguments);
}

function first(_x18) {
  return _first.apply(this, arguments);
}
/*
 * Timer Functions
 */


function _first() {
  _first = _asyncToGenerator(function* (queueName) {
    let count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return (yield range(queueName, count * -1, -1)).reverse();
  });
  return _first.apply(this, arguments);
}

function pause() {
  return _pause.apply(this, arguments);
}

function _pause() {
  _pause = _asyncToGenerator(function* () {
    let mins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return new Promise(resolve => {
      const timeout = setTimeout(() => {
        return resolve(timeout);
      }, 1000 * mins);
    });
  });
  return _pause.apply(this, arguments);
}

function delay() {
  return _delay.apply(this, arguments);
}

function _delay() {
  _delay = _asyncToGenerator(function* () {
    let secs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return new Promise(resolve => {
      const timeout = setTimeout(() => {
        return resolve(timeout);
      }, 1000 * secs);
    });
  });
  return _delay.apply(this, arguments);
}

function clearDelay(_x19) {
  return _clearDelay.apply(this, arguments);
}

function _clearDelay() {
  _clearDelay = _asyncToGenerator(function* (timeout) {
    Promise.resolve(() => clearTimeout(timeout)); //eslint-disable-line
  });
  return _clearDelay.apply(this, arguments);
}