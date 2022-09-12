import type { IPFSHTTPClient } from "ipfs-http-client";
export interface IpfsFactoryInterface {
    ipfs: IPFSHTTPClient;
    isIpfsReady: boolean;
    ipfsInitError: Error | null;
}
export default function useIpfsFactory(ipfsHttpNodeUrl: string): IpfsFactoryInterface;
