import React, { useEffect, useCallback, useReducer } from "react";
import { Row, Col, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

/**
 * This class handles the buttons that the user can click in order to manually enter equations.
 * Every button is linked to the parent class via callback functions that are passed.
 */
export default function ButtonPad({
  digitCallback,
  equalsCallback,
  operatorCallback,
  allClearCallback,
  piCallback,
  eulersCallback,
  mathFunctionCallback,
  backspaceCallback,
}) {
  const buttonStyle = { padding: "8px", margin: "2px", width: "80px" };

  return (
    <div>
      <Row>
        <Col>
          <Button
            aria-label={"opening-parenthesis-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("(")}
          >
            (
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"closing-parenthesis-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback(")")}
          >
            )
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"modulus-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("%")}
          >
            %
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"all-clear-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => allClearCallback()}
          >
            AC
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"pi-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => piCallback()}
          >
            π
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"backspace-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => backspaceCallback()}
          >
            <ArrowLeftOutlined />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            aria-label={"zero-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("0")}
          >
            0
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"decimal-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback(".")}
          >
            .
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"equals-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => equalsCallback()}
          >
            =
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"plus-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("+")}
          >
            +
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"power-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("^")}
          >
            x<sup>y</sup>
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"natural-log-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => mathFunctionCallback("ln")}
          >
            ln
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            aria-label={"one-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("1")}
          >
            1
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"two-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("2")}
          >
            2
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"three-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("3")}
          >
            3
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"minus-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("-")}
          >
            -
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"eulers-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => eulersCallback()}
          >
            e
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"cos-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => mathFunctionCallback("cos")}
          >
            cos
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            aria-label={"four-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("4")}
          >
            4
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"five-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("5")}
          >
            5
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"six-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("6")}
          >
            6
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"multiply-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("x")}
          >
            x
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"square-root-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("sqrt")}
          >
            √
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"sin-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => mathFunctionCallback("sin")}
          >
            sin
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            aria-label={"seven-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("7")}
          >
            7
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"eight-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("8")}
          >
            8
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"nine-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => digitCallback("9")}
          >
            9
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"divide-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => operatorCallback("÷")}
          >
            ÷
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"not implemented"}
            style={buttonStyle}
            type="primary"
            onClick={() => allClearCallback()}
          >
            EXP
          </Button>
        </Col>
        <Col>
          <Button
            aria-label={"tangent-button"}
            style={buttonStyle}
            type="primary"
            onClick={() => mathFunctionCallback("tan")}
          >
            tan
          </Button>
        </Col>
      </Row>
    </div>
  );
}
