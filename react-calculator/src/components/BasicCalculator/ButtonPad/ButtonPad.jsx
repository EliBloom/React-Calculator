import React, { useEffect } from 'react';
import { Row, Col, Button } from 'antd';


export default function ButtonPad({
    handleDigitCallback,
    handleEqualsCallback,
    handleOperatorCallback,
    handleAllClearCallback,
}) {
    const buttonStyle = { padding: '8px', margin: '2px', width: '80px' };

    //This will be called the buttons in the pad are pushed
    const updateMethematicalExpression = (newValue) => {
        // the dispatch is where the actions in the reducer of the BasicCalculator originate

    }

    function handleKeyDown(event) {
        console.log(event);
    }

    // function createhandleOperatorCallback(operator) {
    //     return () => {
    //         handleOperatorCallback(operator);
    //     }
    // }

    useEffect(() => {
        document.addEventListener('keydown', (event) => handleKeyDown(event))
    })
    return (
        <>
            <Row>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleOperatorCallback('(')}>(</Button>
                </Col>
                <Col>
                    <Button style={buttonStyle} type="primary" onClick={() => handleOperatorCallback(')')}>)</Button>
                </Col>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleOperatorCallback('%')}>%</Button>
                </Col>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleAllClearCallback()}>AC</Button>
                </Col>
            </Row>
            <Row>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleDigitCallback('0')}>0</Button>
                </Col>
                <Col>
                    <Button style={buttonStyle} type="primary" onClick={() => handleOperatorCallback('.')}>.</Button>
                </Col>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleEqualsCallback()}>=</Button>
                </Col>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleOperatorCallback('+')}>+</Button>
                </Col>
            </Row>
            <Row>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleDigitCallback('1')}>1</Button>
                </Col>
                <Col>
                    <Button style={buttonStyle} type="primary" onClick={() => handleDigitCallback('2')}>2</Button>
                </Col>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleDigitCallback('3')}>3</Button>
                </Col>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleOperatorCallback('-')}>-</Button>
                </Col>
            </Row>
            <Row>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleDigitCallback('4')}>4</Button>
                </Col>
                <Col>
                    <Button style={buttonStyle} type="primary" onClick={() => handleDigitCallback('5')}>5</Button>
                </Col>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleDigitCallback('6')}>6</Button>
                </Col>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleOperatorCallback('x')}>x</Button>
                </Col>
            </Row>
            <Row>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleDigitCallback('7')}>7</Button>
                </Col>
                <Col>
                    <Button style={buttonStyle} type="primary" onClick={() => handleDigitCallback('8')}>8</Button>
                </Col>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleDigitCallback('9')}>9</Button>
                </Col>
                <Col >
                    <Button style={buttonStyle} type="primary" onClick={() => handleOperatorCallback('÷')}>÷</Button>
                </Col>
            </Row>
        </>
    );
}

