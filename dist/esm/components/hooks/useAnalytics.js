var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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