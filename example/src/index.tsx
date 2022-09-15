import React from "react";
import ReactDOM from "react-dom/client";
import { AnalyticsContextProvider, useAnalyticsContext } from "react-dweb-analytics";



const CallEvent = () =>{
    const add = useAnalyticsContext()

    const eType = 'page'
    if(add){
      add({eType, meta: []});
    }
    

    return (<></>)
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AnalyticsContextProvider topic="testApp" ipfsNodeUrl="test_url">
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
