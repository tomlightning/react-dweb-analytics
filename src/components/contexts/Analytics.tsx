import * as React from "react";

import { useAnalytics } from "../hooks/useAnalytics";

import type { AnalyticsAddCallbackType } from "../hooks/useAnalytics";

interface AnalyticsProviderProps {
  topic: string;
  ipfsNodeUrl: string;
  children: JSX.Element;
}

const AnalyticsContext = React.createContext<AnalyticsAddCallbackType | null>(
  null
);

/*
{
  children,
  topic = "ANALYTICS",
  ipfsNodeUrl = process.env.REACT_APP_IPFS_NODE,
}
*/
const AnalyticsContextProvider = (props: AnalyticsProviderProps) => {
  const { children, topic, ipfsNodeUrl } = props;
  const { addEvent } = useAnalytics({ ipfsNodeUrl, topic });

  return (
    <AnalyticsContext.Provider value={addEvent}>
      {children}
    </AnalyticsContext.Provider>
  );
};

const useAnalyticsContext = () => {
  const context = React.useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error(
      "useAnalyticsContext must be used within a AnalyticsContextProvider"
    );
  }
  return context;
};

export { AnalyticsContextProvider, useAnalyticsContext };
