import * as React from "react";
import { useAnalytics } from "../hooks/useAnalytics";
var AnalyticsContext = React.createContext(undefined);
/*
{
  children,
  topic = "ANALYTICS",
  ipfsNodeUrl = process.env.REACT_APP_IPFS_NODE,
}
*/
var AnalyticsContextProvider = function (props) {
    var children = props.children, projectId = props.projectId;
    var addEvent = useAnalytics({ projectId: projectId }).addEvent;
    return (React.createElement(AnalyticsContext.Provider, { value: { addEvent: addEvent } }, children));
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