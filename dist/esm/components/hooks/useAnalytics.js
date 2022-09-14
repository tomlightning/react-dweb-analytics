import { __assign, __awaiter, __generator } from "tslib";
import { useState, useRef, useCallback, useEffect } from "react";
import useIpfsFactory from "./useIpfsFactory";
var sendEvents = function (ipfs, events, topic) { return __awaiter(void 0, void 0, void 0, function () {
    var msg;
    return __generator(this, function (_a) {
        msg = new TextEncoder().encode(JSON.stringify(events));
        return [2 /*return*/, ipfs.pubsub.publish(topic, msg)];
    });
}); };
export var useAnalytics = function (opts) {
    var ipfsNodeUrl = opts.ipfsNodeUrl, topic = opts.topic;
    var ipfsObj = useIpfsFactory(ipfsNodeUrl);
    var inFlight = useRef(false);
    var pending = useRef([]);
    var _a = useState({
        numPending: 0,
        inFlight: true,
        numDone: 0
    }), stats = _a[0], setStats = _a[1];
    useEffect(function () {
        var _loop_1 = function () {
            inFlight.current = true;
            var analyticsEvents = pending.current.splice(0, pending.current.length);
            setStats(function (stats) {
                return __assign(__assign({}, stats), { numPending: stats.numPending - analyticsEvents.length, inFlight: true });
            });
            var result = sendEvents(ipfsObj.ipfs, analyticsEvents, topic);
            result
                .then(function () {
                inFlight.current = false;
                setStats(function (stats) {
                    return __assign(__assign({}, stats), { inFlight: false, numDone: stats.numDone + 1 });
                });
            })["catch"](function () {
                inFlight.current = false;
                setStats(function (stats) {
                    return __assign(__assign({}, stats), { inFlight: false, numDone: stats.numDone + 1 });
                });
            });
        };
        while (inFlight.current === false &&
            pending.current.length > 0 &&
            ipfsObj.isIpfsReady) {
            _loop_1();
        }
    }, [stats, ipfsObj.isIpfsReady, topic]);
    var addEvent = useCallback(function (analyticsEvent) {
        pending.current.push(analyticsEvent);
        setStats(function (stats) {
            return __assign(__assign({}, stats), { numPending: stats.numPending + 1 });
        });
    }, []);
    return { addEvent: addEvent };
};
//# sourceMappingURL=useAnalytics.js.map