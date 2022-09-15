"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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