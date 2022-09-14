import { useState, useEffect } from "react";
import { create } from "ipfs-http-client";
import type { IPFSHTTPClient } from "ipfs-http-client";

let ipfsGlobal: IPFSHTTPClient | null = null;

export interface IpfsFactoryInterface {
  ipfs: IPFSHTTPClient;
  isIpfsReady: boolean;
  ipfsInitError: Error | null;
}

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
export default function useIpfsFactory(
  ipfsHttpNodeUrl: string
): IpfsFactoryInterface {
  const [isIpfsReady, setIpfsReady] = useState<boolean>(Boolean(ipfsGlobal));
  const [ipfsInitError, setIpfsInitError] = useState<Error | null>(null);

  useEffect(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.

    startIpfs(ipfsHttpNodeUrl);
    return function cleanup() {
      if (ipfsGlobal && ipfsGlobal.stop) {
        ipfsGlobal.stop().catch((err: Error) => console.error(err));
        ipfsGlobal = null;
        setIpfsReady(false);
      }
    };
  }, [ipfsHttpNodeUrl]);

  async function startIpfs(ipfsHttpNodeUrl: string):Promise<void> {
    if (!ipfsGlobal) {
      try {
        ipfsGlobal = create({ url: ipfsHttpNodeUrl });
      } catch (error) {
        ipfsGlobal = null;
        setIpfsInitError(error as Error);
        console.error(error);
      }
    }

    setIpfsReady(Boolean(ipfsGlobal));
  }

  return { ipfs: ipfsGlobal as IPFSHTTPClient, isIpfsReady, ipfsInitError };
}
