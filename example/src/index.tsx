import React from "react";
import ReactDOM from "react-dom/client";
import {
  AnalyticsContextProvider,
  useAnalyticsContext,
} from "react-dweb-analytics";
import { useEffect } from "react";

const CallEvent = () => {
  const analytics = useAnalyticsContext();

  useEffect(() => {
    const eType = "page";
    if (analytics.addEvent) {
      analytics.addEvent({ eType, meta: [] });
    }
  }, []);

  return <></>;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AnalyticsContextProvider projectId="ESTEROIDS_ANALYTICS">
      <>
        <div>
          <h2>Calling Event</h2>
          <CallEvent />
        </div>
        <hr />
        <div></div>
      </>
    </AnalyticsContextProvider>
  </React.StrictMode>
);
