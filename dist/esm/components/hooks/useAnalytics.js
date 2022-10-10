import { __assign, __awaiter, __generator } from "tslib";
import { useState, useRef, useCallback, useEffect } from "react";
import useIpfsFactory from "./useIpfsFactory";
var ipfsNodeUrl = "https://ipfs2.dwebservices.xyz:8080/api/v0";
var sendEvents = function (ipfs, events, projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var msg;
    return __generator(this, function (_a) {
        msg = new TextEncoder().encode(JSON.stringify(events));
        try {
            return [2 /*return*/, ipfs.pubsub.publish(projectId, msg)];
        }
        catch (error) {
            console.log(error);
        }
        return [2 /*return*/];
    });
}); };
export var useAnalytics = function (opts) {
    var projectId = opts.projectId;
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
            var result = sendEvents(ipfsObj.ipfs, analyticsEvents, projectId);
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
    }, [stats, ipfsObj.isIpfsReady, projectId]);
    var addEvent = useCallback(function (analyticsEvent) {
        pending.current.push(analyticsEvent);
    }, []);
    return { addEvent: addEvent };
};
//# sourceMappingURL=useAnalytics.js.map