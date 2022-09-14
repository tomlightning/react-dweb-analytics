import * as React from "react";
import { useAnalytics } from "../hooks/useAnalytics";
var AnalyticsContext = React.createContext(null);
/*
{
  children,
  topic = "ANALYTICS",
  ipfsNodeUrl = process.env.REACT_APP_IPFS_NODE,
}
*/
var AnalyticsContextProvider = function (props) {
    var children = props.children, topic = props.topic, ipfsNodeUrl = props.ipfsNodeUrl;
    var addEvent = useAnalytics({ ipfsNodeUrl: ipfsNodeUrl, topic: topic }).addEvent;
    return (React.createElement(AnalyticsContext.Provider, { value: addEvent }, children));
};
var useAnalyticsContext = function () {
    var context = React.useContext(AnalyticsContext);
    if (context === undefined) {
        throw new Error("useAnalyticsContext must be used within a AnalyticsContextProvider");
    }
    return context;
};
export { AnalyticsContextProvider, useAnalyticsContext };
//# sourceMappingURL=Analytics.js.map