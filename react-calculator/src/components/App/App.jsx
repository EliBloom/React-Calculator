import React from 'react'
import BasicCalculator from '../BasicCalculator'
import AdvancedCalculator from '../AdvancedCalculator'
import { Tabs } from 'antd'

export default function App() {
    const basicCalculatorStyle = {
        //     marginLeft: 'auto',
        //     marginRight: 'auto',
        color: "green"
    }

    const { TabPane } = Tabs;
    return (
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Basic Calculator" key="1">
                    <BasicCalculator style={basicCalculatorStyle} />
                </TabPane>
                <TabPane tab="Advanced Calculator" key="2">
                    <AdvancedCalculator />
                </TabPane>
            </Tabs>

        </>
    )
}