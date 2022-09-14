"use strict";
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
exports.__esModule = true;
var react_1 = require("react");
var ipfs_http_client_1 = require("ipfs-http-client");
var ipfsGlobal = null;
/*
 * A quick demo using React hooks to create an ipfs instance.
 *
 * Hooks are brand new at the time of writing, and this pattern
 * is intended to show it is possible. I don't know if it is wise.
 *
 * Next steps would be to store the ipfs instance on the context
 * so use-ipfs calls can grab it from there rather than expecting
 * it to be passed in.
 */
function useIpfsFactory(ipfsHttpNodeUrl) {
    var _a = (0, react_1.useState)(Boolean(ipfsGlobal)), isIpfsReady = _a[0], setIpfsReady = _a[1];
    var _b = (0, react_1.useState)(null), ipfsInitError = _b[0], setIpfsInitError = _b[1];
    (0, react_1.useEffect)(function () {
        // The fn to useEffect should not return anything other than a cleanup fn,
        // So it cannot be marked async, which causes it to return a promise,
        // Hence we delegate to a async fn rather than making the param an async fn.
        startIpfs(ipfsHttpNodeUrl);
        return function cleanup() {
            if (ipfsGlobal && ipfsGlobal.stop) {
                ipfsGlobal.stop()["catch"](function (err) { return console.error(err); });
                ipfsGlobal = null;
                setIpfsReady(false);
            }
        };
    }, [ipfsHttpNodeUrl]);
    function startIpfs(ipfsHttpNodeUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!ipfsGlobal) {
                    try {
                        ipfsGlobal = (0, ipfs_http_client_1.create)({ url: ipfsHttpNodeUrl });
                    }
                    catch (error) {
                        ipfsGlobal = null;
                        setIpfsInitError(error);
                        console.error(error);
                    }
                }
                setIpfsReady(Boolean(ipfsGlobal));
                return [2 /*return*/];
            });
        });
    }
    return { ipfs: ipfsGlobal, isIpfsReady: isIpfsReady, ipfsInitError: ipfsInitError };
}
exports["default"] = useIpfsFactory;
//# sourceMappingURL=useIpfsFactory.js.map