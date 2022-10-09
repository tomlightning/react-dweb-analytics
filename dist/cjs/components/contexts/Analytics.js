"use strict";
exports.__esModule = true;
exports.useAnalyticsContext = exports.AnalyticsContextProvider = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var useAnalytics_1 = require("../hooks/useAnalytics");
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
    var addEvent = (0, useAnalytics_1.useAnalytics)({ projectId: projectId }).addEvent;
    return (React.createElement(AnalyticsContext.Provider, { value: { addEvent: addEvent } }, children));
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