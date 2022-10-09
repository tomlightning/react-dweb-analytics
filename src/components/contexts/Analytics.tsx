import * as React from "react";

import { useAnalytics } from "../hooks/useAnalytics";

import type { AnalyticsAddCallbackType } from "../hooks/useAnalytics";

interface AnalyticsProviderProps {
  projectId: string;
  children: JSX.Element;
}

// interface AnalyticsProviderProps {
//   projectId: string;
//   children: JSX.Element[];
// }

interface IAnalyticsContext {
  addEvent: AnalyticsAddCallbackType;
}

const AnalyticsContext = React.createContext<IAnalyticsContext | undefined>(
  undefined
);

/*
{
  children,
  topic = "ANALYTICS",
  ipfsNodeUrl = process.env.REACT_APP_IPFS_NODE,
}
*/
const AnalyticsContextProvider = (props: AnalyticsProviderProps) => {
  const { children, projectId } = props;
  const { addEvent } = useAnalytics({ projectId });

  return (
    <AnalyticsContext.Provider value={{ addEvent }}>
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
