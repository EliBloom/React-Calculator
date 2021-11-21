import React, { createContext } from "react";
import BasicCalculator from "../BasicCalculator";
import AdvancedCalculator from "../AdvancedCalculator";
import { Tabs, message } from "antd";

export const ErrorContext = createContext(null);

export default function App() {
  const basicCalculatorStyle = {
    color: "green",
  };

  function handleErrorMessageCallback(errorMessage) {
    message.error(errorMessage, 3);
  }
  const { TabPane } = Tabs;
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Basic Calculator" key="1">
          <ErrorContext.Provider value={handleErrorMessageCallback}>
            <BasicCalculator style={basicCalculatorStyle} />
          </ErrorContext.Provider>
        </TabPane>
        <TabPane tab="Advanced Calculator" key="2">
          <AdvancedCalculator />
        </TabPane>
      </Tabs>
    </>
  );
}
