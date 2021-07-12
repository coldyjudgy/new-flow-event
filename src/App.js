import React from "react";
import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";

fcl.config().put("accessNode.api", "https://access-mainnet-beta.onflow.org")

function App() {
const getEvents = async (params) => {
  // Define event type from params
  const { contractAddress, contractName, eventName } = params;
  const eventType = `A.${contractAddress}.${contractName}.${eventName}`;

  const { from = 0, to } = params;
  let toBlock;
  if (to === undefined) {
    // Get latest block
    const blockResponse = await sdk.send(sdk.build([
      sdk.getLatestBlock()
    ]).then(sdk.decode)); // ! 변경

    toBlock = blockResponse.latestBlock.height;
  } else {
    toBlock = to;
  }

  const response = await fcl.send(
    await sdk.build([sdk.getEvents(eventType, from, toBlock)])
  );


  const fixNames = (item) => {
    var result = {}
  
    for (let name of Object.keys(item)) {
      const value = item[name]
      const fixedName = name.replace(/\w+_/,'')
      result[fixedName] = value
    }
  
    return result
  }
  
  const events = await fcl.decode(response);
  const fixedEvents = events.map((item) => {
    const { data } = item;
    item.data = fixNames(data);
    return item;
  });

  // Return a list of events
  return fixedEvents;
};

const getHelloEvents = async () => {
  const events = await getEvents({
    contractName: "HelloWorld",
    contractAddress: "01cf0e2f2f715450", // note the address is without "0x" prefix
    eventName: "CustomEvent",
  });
  console.log({ events });
};

  return (
    <div>
    <button onClick={getHelloEvents}>Get events</button>
    </div>
    );
}

export default App;
