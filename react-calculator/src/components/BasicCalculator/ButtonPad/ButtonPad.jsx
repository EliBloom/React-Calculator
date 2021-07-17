import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";

/**
 * This class handles the buttons that the user can click in order to manually enter equations.
 * Every button is linked to the parent class via callback functions that are passed.
 */
export default function ButtonPad({
  handleDigitCallback,
  handleEqualsCallback,
  handleOperatorCallback,
  handleAllClearCallback,
  handlePiCallback,
  // handlePowerCallback,
  handleEulersCallback,
}) {
  const buttonStyle = { padding: "8px", margin: "2px", width: "80px" };

  function handleKeyDown(event) {
    console.log(event);
  }

  useEffect(() => {
    document.addEventListener("keydown", (event) => handleKeyDown(event));
  });
  return (
    <>
      <Row>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleOperatorCallback("(")}
          >
            (
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleOperatorCallback(")")}
          >
            )
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleOperatorCallback("%")}
          >
            %
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleAllClearCallback()}
          >
            AC
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handlePiCallback()}
          >
            π
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleDigitCallback("0")}
          >
            0
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleDigitCallback(".")}
          >
            .
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleEqualsCallback()}
          >
            =
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleOperatorCallback("+")}
          >
            +
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleOperatorCallback("^")}
          >
            x<sup>y</sup>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleDigitCallback("1")}
          >
            1
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleDigitCallback("2")}
          >
            2
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleDigitCallback("3")}
          >
            3
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleOperatorCallback("-")}
          >
            -
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleEulersCallback()}
          >
            e
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleDigitCallback("4")}
          >
            4
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleDigitCallback("5")}
          >
            5
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleDigitCallback("6")}
          >
            6
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleOperatorCallback("x")}
          >
            x
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleOperatorCallback("sqrt")}
          >
            √
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleDigitCallback("7")}
          >
            7
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleDigitCallback("8")}
          >
            8
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleDigitCallback("9")}
          >
            9
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleOperatorCallback("÷")}
          >
            ÷
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => handleAllClearCallback()}
          >
            Test
          </Button>
        </Col>
      </Row>
    </>
  );
}
