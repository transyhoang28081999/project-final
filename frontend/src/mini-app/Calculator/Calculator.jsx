/* eslint-disable react/prop-types */
import { Space, Typography } from "antd"
import './Calculator.css'
import Screen from "./Screen"
import KeyBoard from "./KeyBoard"
import tr from "../../translate";

import { useState } from "react"

const {Title} = Typography
const Calculator = ({lang}) => {
    const [input, setInput] = useState("")
    const [operator, setOperator] = useState("")
    const [prevNumber, setPrevNumber] = useState("")
    const [result, setResult] = useState(0)

    const addZero = () => {
        if(input === "") return
        if(input === "-") return
        setInput(input + 0)
    }

    const PoNeNum = () => {
        if(input[0] === "-") setInput(input.slice(1))
        else setInput("-" + input)
    }

    const addOperator = (value) => {
        setOperator(value)
        setPrevNumber(input)
        setInput("")
    }

    const clear = () => {
        setInput("")
        setOperator("")
        setPrevNumber("")
    }

    const evaluate = () => {
        if(operator === "+") setResult(+prevNumber + +input)
        if(operator === "-") setResult(+prevNumber - +input)
        if(operator === "x") setResult(+prevNumber * +input)
        if(operator === "/") setResult(+prevNumber / +input)

        setOperator("")
        setInput(prevNumber + " " + operator + " " + input + " =")
        setPrevNumber("")
    }

    const items = [
        {value: "CE", weight: 2, onClick: () => clear()},
        {value: <>&larr;</>, weight: 2, onClick: () => setInput(input.slice(0,-1))},
        {value: "1", onClick: () => setInput(input + 1)},
        {value: "2", onClick: () => setInput(input + 2)},
        {value: "3", onClick: () => setInput(input + 3)},
        {value: "+", onClick: () => addOperator("+")},
        {value: "4", onClick: () => setInput(input + 4)},
        {value: "5", onClick: () => setInput(input + 5)},
        {value: "6", onClick: () => setInput(input + 6)},
        {value: "-", onClick: () => addOperator("-")},
        {value: "7", onClick: () => setInput(input + 7)},
        {value: "8", onClick: () => setInput(input + 8)},
        {value: "9", onClick: () => setInput(input + 9)},
        {value: <>&times;</>, onClick: () => addOperator("x")},
        {value: <>&plusmn;</>, onClick: () => PoNeNum()},
        {value: "0", weight: 2, onClick: () => addZero()},
        {value: <>&divide;</>, onClick: () => addOperator("/")},
        {value: "=", weight: 4, onClick: () => evaluate()},
    ]
    return(
        <Space direction="vertical" className="calculator">
            <Title level={1}>{tr("Calculator", lang)}</Title>
            <Space direction="vertical" className="board">
                <Screen input={input} result={result}/>
                <KeyBoard items={items}/>
            </Space>
        </Space>
    )
}

export default Calculator