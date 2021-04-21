import React, { useState } from 'react';
import Display from './Display';
import ButtonPad from './ButtonPad';

/** MAYBE USE CONTEXTS TO PASS DATA FOR PRACTICE */




export default function BasicCalculator() {
    //alternative to useState, provides a global state, returns the current state and a dispatch method
    const [expression, setExpression] = useState("");
    const basicCalculatorStyle = {
        // marginLeft: 'auto',
        // marginRight: 'auto',
        // display: 'block'
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    function handleDigitCallback(digit) {
        console.log(digit)
        setExpression(expression + digit);
    };

    function handleEqualsCallback() {
        console.log("=")
        // setExpression(expression + digit);
    };

    function handleOperatorCallback(operator) {
        console.log(operator)
        setExpression(expression + operator);
    };

    function handleAllClearCallback() {
        setExpression("");
    };


    return (
        <div style={basicCalculatorStyle}>
            {/* providers provide a subscription to context changes, when the value prop changes any components within will rerender */}

            <Display expression={expression} />
            <ButtonPad
                handleDigitCallback={handleDigitCallback}
                handleEqualsCallback={handleEqualsCallback}
                handleOperatorCallback={handleOperatorCallback}
                handleAllClearCallback={handleAllClearCallback}
            />
        </div>
    );
}