"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useIpfsFactory;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = require("react");

var _ipfsHttpClient = require("ipfs-http-client");

let ipfs = null;
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

function useIpfsFactory(ipfsHttpNode) {
  const [isIpfsReady, setIpfsReady] = (0, _react.useState)(Boolean(ipfs));
  const [ipfsInitError, setIpfsInitError] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.
    startIpfs(ipfsHttpNode);
    return function cleanup() {
      if (ipfs && ipfs.stop) {
        ipfs.stop().catch(err => console.error(err));
        ipfs = null;
        setIpfsReady(false);
      }
    };
  }, []);

  async function startIpfs(ipfsHttpNode) {
    if (ipfs) {} else if (window.ipfs && window.ipfs.enable) {
      ipfs = await window.ipfs.enable({
        commands: ['id']
      });
    } else {
      try {
        ipfs = await (0, _ipfsHttpClient.create)(ipfsHttpNode);
      } catch (error) {
        ipfs = null;
        setIpfsInitError(error);
        console.error(error);
      }
    }

    setIpfsReady(Boolean(ipfs));
  }

  return {
    ipfs,
    isIpfsReady,
    ipfsInitError
  };
}