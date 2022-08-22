Version 0.0.2


# How to use

## Setup 

    import { AnalyticsContextProvider } from "react_dweb_analytics";

### wrap content with context
    <AnalyticsContextProvider topic="my_site" ipfsNodeUrl="https://ipfs-node">
       ......
    </AnalyticsContextProvider>



## Send events
    import { useAnalyticsContext } from "react_dweb_analytics";
    
    .........

    const addEvent = useAnalyticsContext()

    ......

    const eType = 'event-type'
    const meta = {}
    addEvent({eType, meta});

