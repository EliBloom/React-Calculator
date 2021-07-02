import React, { useState } from "react";
import BasicCalculator from "../BasicCalculator";
import AdvancedCalculator from "../AdvancedCalculator";
import { Tabs, Alert } from "antd";

export default function App() {
  // string for error message pop up
  const [errorMessage, setErrorMessage] = useState("");
  const [userError, setUserError] = useState(false);
  const basicCalculatorStyle = {
    color: "green",
  };

  function handleErrorMessageCallback(errorMessage) {
    setErrorMessage(errorMessage);
    setUserError(true);
  }
  const { TabPane } = Tabs;
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Basic Calculator" key="1">
          <BasicCalculator
            style={basicCalculatorStyle}
            errorMessageCallback={handleErrorMessageCallback}
          />
        </TabPane>
        <TabPane tab="Advanced Calculator" key="2">
          <AdvancedCalculator />
        </TabPane>
      </Tabs>
      {userError ? (
        <Alert
          message="Warning"
          description={errorMessage}
          type="warning"
          showIcon
          closable
          afterClose={() => setUserError(false)}
        />
      ) : null}
    </>
  );
}
