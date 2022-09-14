import { useState, useRef, useCallback, useEffect } from "react";
import useIpfsFactory from "./useIpfsFactory";
import type { IPFSHTTPClient } from "ipfs-http-client";

interface AnalyticsEventMetaType {
  [index: string]: number | string;
  name: string;
}

interface AnalyticsEventType {
  eType: string;
  meta: AnalyticsEventMetaType[];
}

export type AnalyticsAddCallbackType = (...args: AnalyticsEventType[]) => void;

interface Queue {
  addEvent: AnalyticsAddCallbackType;
}

interface QueueOpts {
  ipfsNodeUrl: string;
  topic: string;
}

const sendEvents = async (
  ipfs: IPFSHTTPClient,
  events: AnalyticsEventType[],
  topic: string
) => {
  const msg: Uint8Array = new TextEncoder().encode(JSON.stringify(events));
  return ipfs.pubsub.publish(topic, msg);
};

export const useAnalytics = (opts: QueueOpts): Queue => {
  const { ipfsNodeUrl, topic } = opts;
  const ipfsObj = useIpfsFactory(ipfsNodeUrl);

  const inFlight = useRef(false);
  const pending = useRef([] as AnalyticsEventType[]);

  const [stats, setStats] = useState({
    numPending: 0,
    inFlight: true,
    numDone: 0,
  });

  useEffect(() => {
    while (
      inFlight.current === false &&
      pending.current.length > 0 &&
      ipfsObj.isIpfsReady
    ) {
      inFlight.current = true;

      const analyticsEvents = pending.current.splice(0, pending.current.length);
      setStats((stats) => {
        return {
          ...stats,
          numPending: stats.numPending - analyticsEvents.length,
          inFlight: true,
        };
      });
      const result = sendEvents(
        ipfsObj.ipfs as IPFSHTTPClient,
        analyticsEvents,
        topic
      );
      result
        .then(() => {
          inFlight.current = false;
          setStats((stats) => {
            return {
              ...stats,
              inFlight: false,
              numDone: stats.numDone + 1,
            };
          });
        })
        .catch(() => {
          inFlight.current = false;
          setStats((stats) => {
            return {
              ...stats,
              inFlight: false,
              numDone: stats.numDone + 1,
            };
          });
        });
    }
  }, [stats, ipfsObj.isIpfsReady, topic]);

  const addEvent = useCallback<AnalyticsAddCallbackType>(
    (analyticsEvent: AnalyticsEventType) => {
      pending.current.push(analyticsEvent);
      setStats((stats) => {
        return {
          ...stats,
          numPending: stats.numPending + 1,
        };
      });
    },
    []
  );

  return { addEvent };
};
