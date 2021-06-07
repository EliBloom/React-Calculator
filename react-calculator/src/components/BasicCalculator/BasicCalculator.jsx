import React, { useState, useRef } from 'react';
import Display from './Display';
import ButtonPad from './ButtonPad';

/** MAYBE USE CONTEXTS TO PASS DATA FOR PRACTICE */

export default function BasicCalculator() {
    //alternative to useState, provides a global state, returns the current state and a dispatch method
    const [equationString, setEquationString] = useState("");
    //this is to keep track of where each operator is in the equation array
    let equationIndex = useRef(0);
    let operandMap = useRef({});
    let operand = useRef("");
    let equation = useRef([]);

    /**
     * issue with an ovject is that the order of key insertion is not  garaunteed, so this might need to be changed to a map, or possibly a 2d arrayf
     */
    const operatorMap = useRef({ "()": [], "^sqrt": [], "*/x÷%": [], "+-": [] })

    const basicCalculatorStyle = {
        // marginLeft: 'auto',
        // marginRight: 'auto',
        // display: 'block'
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    function handleDigitCallback(digit) {
        operand.current += digit;

        setEquationString(equationString + digit);
    };



    function handleOperatorCallback(operator) {
        equation.current.push(operand.current);
        equationIndex.current += 1;
        operandMap.current[equationIndex.current] = operand.current;
        operand.current = "";

        equation.current.push(operator);
        setEquationString(equationString + operator);

        Object.keys(operatorMap.current).forEach(operatorKey => {
            if (operatorKey.includes(operator)) {
                operatorMap.current[operatorKey].push(equationIndex.current)
                equationIndex.current += 1;
            }
        })

    };

    function handleEqualsCallback() {
        equation.current.push(operand.current);
        equationIndex.current += 1;

        calculate();
    };

    function handleAllClearCallback() {
        equationIndex.current = 0;
        operand.current = "";
        operatorMap.current = {};
        operandMap = {};
        equation = [];
        setEquationString("");
    };

    function calculate() {
        const operatorMapValues = Object.values(operatorMap.current).filter(operatorsArr => operatorsArr.length > 0);
        let runningTotal = 0;

        const operatorMapKeys = Object.keys(operatorMap.current);

        for (let a = 0; a < operatorMapKeys.length; a++) {
            let operatorsArr = operatorMap.current[operatorMapKeys[a]];


            if (operatorsArr.length > 0) {
                for (let b = 0; b < operatorsArr.length; b++) {
                    let operatorIndex = operatorMap.current[operatorMapKeys[a]][b];
                    const leftOperand = equation.current[operatorIndex - 1];
                    const rightOperand = equation.current[operatorIndex + 1];
                    const operator = equation.current[operatorIndex];
                    runningTotal = performOperation(parseInt(leftOperand), operator, parseInt(rightOperand));
                    equation.current.splice(operatorIndex - 1, 3, runningTotal);


                    for (let c = 0; c < operatorMapKeys.length; c++) {
                        let operatorsArr = operatorMap.current[operatorMapKeys[c]];
                        const tempArr = [];
                        operatorsArr.forEach(index => {
                            if (index > operatorIndex) {
                                index -= 2;
                                tempArr.push(index)
                            }
                            else {
                                tempArr.push(index);
                            }
                        })
                        if (tempArr.length > 0) {
                            operatorMap.current[operatorMapKeys[c]] = tempArr;
                        }
                    }
                }
            }
        }
        setEquationString(runningTotal);
    }

    function performOperation(leftOperand, operator, rightOperand) {
        let total = 0;
        switch (operator) {
            case '^':
                total = Math.pow(leftOperand, rightOperand);
                break;

            case 'sqrt':
                total = Math.sqrt(rightOperand);
                break;
            case 'x':
                total = leftOperand * rightOperand;
                break;
            case '*':
                total = leftOperand * rightOperand;
                break;
            case '/':
                total = leftOperand / rightOperand;
                break;
            case '÷':
                total = leftOperand / rightOperand;
                break;
            case '%':
                total = leftOperand % rightOperand;
                break;
            case '+':
                total = leftOperand + rightOperand;
                break;
            case '-':
                total = leftOperand - rightOperand;
                break;
            default:
                break;
        }

        return total.toString();
    }

    return (
        <div style={basicCalculatorStyle}>
            {/* providers provide a subscription to context changes, when the value prop changes any components within will rerender */}

            <Display expression={equationString} />
            <ButtonPad
                handleDigitCallback={handleDigitCallback}
                handleEqualsCallback={handleEqualsCallback}
                handleOperatorCallback={handleOperatorCallback}
                handleAllClearCallback={handleAllClearCallback}
            />
        </div>
    );
}