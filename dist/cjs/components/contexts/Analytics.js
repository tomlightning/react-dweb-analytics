"use strict";
exports.__esModule = true;
exports.useAnalyticsContext = exports.AnalyticsContextProvider = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var useAnalytics_1 = require("../hooks/useAnalytics");
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
    var addEvent = (0, useAnalytics_1.useAnalytics)({ ipfsNodeUrl: ipfsNodeUrl, topic: topic }).addEvent;
    return (React.createElement(AnalyticsContext.Provider, { value: addEvent }, children));
};
exports.AnalyticsContextProvider = AnalyticsContextProvider;
var useAnalyticsContext = function () {
    var context = React.useContext(AnalyticsContext);
    if (context === undefined) {
        throw new Error("useAnalyticsContext must be used within a AnalyticsContextProvider");
    }
    return context;
};
exports.useAnalyticsContext = useAnalyticsContext;
//# sourceMappingURL=Analytics.js.map