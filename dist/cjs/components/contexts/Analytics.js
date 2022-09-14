"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.useAnalyticsContext = exports.AnalyticsContextProvider = void 0;
var React = __importStar(require("react"));
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