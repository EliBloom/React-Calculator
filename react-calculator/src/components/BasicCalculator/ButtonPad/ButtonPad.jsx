import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";

/**
 * This class handles the buttons that the user can click in order to manually enter equations.
 * Every button is linked to the parent class via callback functions that are passed.
 */
export default function ButtonPad({
  digitCallback,
  equalsCallback,
  operatorCallback,
  allClearCallback,
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
            onClick={() => operatorCallback("(")}
          >
            (
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback(")")}
          >
            )
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("%")}
          >
            %
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => allClearCallback()}
          >
            AC
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("0")}
          >
            0
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback(".")}
          >
            .
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => equalsCallback()}
          >
            =
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("+")}
          >
            +
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("1")}
          >
            1
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("2")}
          >
            2
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("3")}
          >
            3
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("-")}
          >
            -
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("4")}
          >
            4
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("5")}
          >
            5
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("6")}
          >
            6
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("x")}
          >
            x
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("7")}
          >
            7
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("8")}
          >
            8
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("9")}
          >
            9
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("÷")}
          >
            ÷
          </Button>
        </Col>
      </Row>
    </>
  );
}
