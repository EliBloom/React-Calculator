import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';



// const StyledIndicatorList = styled.div`
//   font-size: 0.75em;
//   line-height: 1;
//   opacity: 0.4;
//   text-align: right;
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 0.25em;
//   min-height: 1em;
// `

// const StyledExpression = styled.span`
//   margin-left: auto;
// `

// const StyleScreen = styled.div`
//   font-size: 2.5em;
//   min-height: 1.4em;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;  
//   overflow: hidden;
// `

// const StyledDisplay = styled.div`
//   background-color: #393939;
//   color: #fff;
//   padding: 1.5em 1em;
// `
//has props expression and hasMemory
export function Display(props) {
    const inputStyle = { width: '334px' };

    function handleInputChange(userInput) {
        // const x = userInputEvent ? userInputEvent.target.value : '';

    }


    return (
        <div>

            <Input style={inputStyle} placeholder="Basic usage"
                value={props.expression}
                onChange={(userInputEvent) => handleInputChange(userInputEvent.target.value)}
            />

        </div>
    )
}

export default Display
