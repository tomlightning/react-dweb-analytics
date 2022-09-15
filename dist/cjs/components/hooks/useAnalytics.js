"use strict";
exports.__esModule = true;
exports.useAnalytics = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var useIpfsFactory_1 = tslib_1.__importDefault(require("./useIpfsFactory"));
var sendEvents = function (ipfs, events, topic) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var msg;
    return tslib_1.__generator(this, function (_a) {
        msg = new TextEncoder().encode(JSON.stringify(events));
        return [2 /*return*/, ipfs.pubsub.publish(topic, msg)];
    });
}); };
var useAnalytics = function (opts) {
    var ipfsNodeUrl = opts.ipfsNodeUrl, topic = opts.topic;
    var ipfsObj = (0, useIpfsFactory_1["default"])(ipfsNodeUrl);
    var inFlight = (0, react_1.useRef)(false);
    var pending = (0, react_1.useRef)([]);
    var _a = (0, react_1.useState)({
        numPending: 0,
        inFlight: true,
        numDone: 0
    }), stats = _a[0], setStats = _a[1];
    (0, react_1.useEffect)(function () {
        var _loop_1 = function () {
            inFlight.current = true;
            var analyticsEvents = pending.current.splice(0, pending.current.length);
            setStats(function (stats) {
                return tslib_1.__assign(tslib_1.__assign({}, stats), { numPending: stats.numPending - analyticsEvents.length, inFlight: true });
            });
            var result = sendEvents(ipfsObj.ipfs, analyticsEvents, topic);
            result
                .then(function () {
                inFlight.current = false;
                setStats(function (stats) {
                    return tslib_1.__assign(tslib_1.__assign({}, stats), { inFlight: false, numDone: stats.numDone + 1 });
                });
            })["catch"](function () {
                inFlight.current = false;
                setStats(function (stats) {
                    return tslib_1.__assign(tslib_1.__assign({}, stats), { inFlight: false, numDone: stats.numDone + 1 });
                });
            });
        };
        while (inFlight.current === false &&
            pending.current.length > 0 &&
            ipfsObj.isIpfsReady) {
            _loop_1();
        }
    }, [stats, ipfsObj.isIpfsReady, topic]);
    var addEvent = (0, react_1.useCallback)(function (analyticsEvent) {
        pending.current.push(analyticsEvent);
        setStats(function (stats) {
            return tslib_1.__assign(tslib_1.__assign({}, stats), { numPending: stats.numPending + 1 });
        });
    }, []);
    return { addEvent: addEvent };
};
exports.useAnalytics = useAnalytics;
//# sourceMappingURL=useAnalytics.js.map