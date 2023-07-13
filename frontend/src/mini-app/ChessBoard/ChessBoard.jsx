/* eslint-disable react/prop-types */
import { Button, ColorPicker, InputNumber, Space, Typography } from "antd";
import { useState } from "react";
import Node from "./Node";
import tr from "../../translate";
import "./chessBoard.css";

const { Title } = Typography;
const ChessBoard = ({lang}) => {
  const [size, setSize] = useState(8);
  const [evenColor, setEvenColor] = useState("black")
  const [oddColor, setOddColor] = useState("white")
  let chessBoard = new Array();
  for (let i = 0; i < size; i++) {
    let rows = new Array();
    for (let j = 0; j < size; j++) {
      rows[j] = [];
    }
    chessBoard[i] = rows;
  }
  const changeColor = () => {
    setEvenColor(oddColor)
    setOddColor(evenColor)
  }
  return (
    <Space direction="vertical" className="chessBoard">
      <Title level={1}>{tr("Chess Board", lang)}</Title>
      <InputNumber
        addonBefore={tr("Enter a size", lang)}
        defaultValue={size}
        onPressEnter={(e) => setSize(e.target.value)}
      />
      <Space style={{ marginTop: 10 }}>
        <ColorPicker value={evenColor} trigger="hover" onChange={(_, hex) => setEvenColor(hex)}/>{tr("Even", lang)}
        <ColorPicker value={oddColor} trigger="hover" onChange={(_, hex) => setOddColor(hex)}/>{tr("Odd", lang)}
        <Button onClick={changeColor}>{tr("Convert", lang)}</Button>
      </Space>
      <div direction="vertical" className="board">
        {chessBoard.map((rows, id) => (
          <div key={id} className="rows">
            {rows.map((_, idx) => (
              <Node key={idx} color={(id + idx) % 2 === 0 ? evenColor : oddColor} onClick={changeColor}/>
            ))}
          </div>
        ))}
      </div>
    </Space>
  );
};

export default ChessBoard;
