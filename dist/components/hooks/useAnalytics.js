"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.json.stringify.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _useIpfsFactory = _interopRequireDefault(require("./useIpfsFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const sendEvents = async (ipfs, events, topic) => {
  const msg = JSON.stringify(events);
  return ipfs.pubsub.publish(topic, msg);
};

function useAnalytics(_ref) {
  let {
    ipfsNodeUrl,
    topic
  } = _ref;
  const ipfsObj = (0, _useIpfsFactory.default)(ipfsNodeUrl);
  const inFlight = (0, _react.useRef)(false);
  const pending = (0, _react.useRef)([]);
  const [stats, setStats] = (0, _react.useState)({
    numPending: 0,
    inFlight: true,
    numDone: 0
  });
  (0, _react.useEffect)(() => {
    while (inFlight.current === false && pending.current.length > 0 && ipfsObj.isIpfsReady) {
      inFlight.current = true;
      const analyticsEvents = pending.current.splice(0, pending.current.length);
      setStats(stats => {
        return _objectSpread(_objectSpread({}, stats), {}, {
          numPending: stats.numPending - analyticsEvents.length,
          inFlight: true
        });
      });
      const result = sendEvents(ipfsObj.ipfs, analyticsEvents, topic);
      result.then(() => {
        inFlight.current = false;
        setStats(stats => {
          return _objectSpread(_objectSpread({}, stats), {}, {
            inFlight: false,
            numDone: stats.numDone + 1
          });
        });
      }).catch(() => {
        inFlight.current = false;
        setStats(stats => {
          return _objectSpread(_objectSpread({}, stats), {}, {
            inFlight: false,
            numDone: stats.numDone + 1
          });
        });
      });
    }
  }, [stats, ipfsObj.isIpfsReady]);
  const add = (0, _react.useCallback)(analyticsEvent => {
    pending.current.push(analyticsEvent);
    setStats(stats => {
      return _objectSpread(_objectSpread({}, stats), {}, {
        numPending: stats.numPending + 1
      });
    });
  }, []);
  return {
    add
  };
}

var _default = useAnalytics;
exports.default = _default;