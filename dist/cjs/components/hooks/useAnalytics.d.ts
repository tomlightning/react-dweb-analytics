interface AnalyticsEventMetaType {
    [index: string]: number | string;
    name: string;
}
interface AnalyticsEventType {
    eType: string;
    meta: AnalyticsEventMetaType[];
}
export declare type AnalyticsAddCallbackType = (...args: AnalyticsEventType[]) => void;
interface Queue {
    addEvent: AnalyticsAddCallbackType;
}
interface QueueOpts {
    ipfsNodeUrl: string;
    topic: string;
}
export declare const useAnalytics: (opts: QueueOpts) => Queue;
export {};
