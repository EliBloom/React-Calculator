import React, { useState, createContext } from "react";
import BasicCalculator from "../BasicCalculator";
import AdvancedCalculator from "../AdvancedCalculator";
import { Tabs, Alert } from "antd";

export default function App() {
  // string for error message pop up, this is a good spot to use context since I want the Display component to set the errorMessage, which
  //would require App->BasicCalculator->Display
  const [errorMessage, setErrorMessage] = useState("");
  const ErrorContext = createContext(handleErrorMessageCallback);
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
          <ErrorContext.Provider>
            <BasicCalculator
              style={basicCalculatorStyle}
              // errorMessageCallback={handleErrorMessageCallback}
            />
          </ErrorContext.Provider>
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
