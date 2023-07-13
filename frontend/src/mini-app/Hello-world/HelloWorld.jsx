/* eslint-disable react/prop-types */
import { Input, Space, Typography } from "antd"
import { useState } from "react"
import tr from "../../translate";

const { Title, Text } = Typography 

const HelloWorld = ({lang}) => {
    const [text, setText] = useState("")
    return(
        <Space direction="vertical" className="hello-world">
            <Title level={1}>{tr("Hello World", lang)}</Title>
            <Input onPressEnter={(e) => setText(e.target.value)} minLength={300} size="large" defaultValue={tr("Hello World", lang)} style={{width: "500px"}}/>
            <Text italic>{text}</Text>
        </Space>
    )
}

export default HelloWorld