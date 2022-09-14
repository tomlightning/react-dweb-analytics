import type { AnalyticsAddCallbackType } from "../hooks/useAnalytics";
interface AnalyticsProviderProps {
    topic: string;
    ipfsNodeUrl: string;
    children: JSX.Element;
}
declare const AnalyticsContextProvider: (props: AnalyticsProviderProps) => JSX.Element;
declare const useAnalyticsContext: () => AnalyticsAddCallbackType | null;
export { AnalyticsContextProvider, useAnalyticsContext };
