import type { AnalyticsAddCallbackType } from "../hooks/useAnalytics";
interface AnalyticsProviderProps {
    projectId: string;
    children: JSX.Element;
}
interface IAnalyticsContext {
    addEvent: AnalyticsAddCallbackType;
}
declare const AnalyticsContextProvider: (props: AnalyticsProviderProps) => JSX.Element;
declare const useAnalyticsContext: () => IAnalyticsContext;
export { AnalyticsContextProvider, useAnalyticsContext };
