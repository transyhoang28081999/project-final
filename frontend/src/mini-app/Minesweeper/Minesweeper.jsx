/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, InputNumber, Modal, Space, Typography } from "antd";
import "./Minesweeper.css";
import Cell from "./Cell";
import { useEffect, useState } from "react";
import tr from "../../translate";

const { Title } = Typography;

/* eslint-disable no-constant-condition */
const Minesweeper = ({ lang }) => {
  const [mineFieldWidth, setMineFieldWidth] = useState(20);
  const [mineFieldHeight, setMineFieldHeight] = useState(15);

  const [mineNum, setMineNum] = useState(45);
  const [flagsNum, setFlagsNum] = useState(45);

  const [field, setField] = useState([]);
  const [open, setOpen] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [openLose, setOpenLose] = useState(false)
  const [win, setWin] = useState(false)
  const [keepGoin, setKeepGoin] = useState(false)

  let mineField = [];
  useEffect(() => {
    if(keepGoin) {setKeepGoin(false); return}
    setFlagsNum(mineNum);
    for (let x = 0; x < mineFieldHeight; x++) {
      let row = [];
      for (let y = 0; y < mineFieldWidth; y++) {
        row.push({
          hasMine: false,
          isVisible: false,
          hasFlag: false,
          neighbors: 0,
          isSpread: false,
        });
      }
      mineField.push(row);
    }

    let k = 0;
    while (k < mineNum) {
      let i = Math.floor(Math.random() * mineFieldHeight);
      let j = Math.floor(Math.random() * mineFieldWidth);
      if (mineField[i][j].hasMine === false) {
        mineField[i][j].hasMine = true;
        mineField[i][j].neighbors = "x";
        k++;
      }
    }
    for (let x = 0; x < mineFieldHeight; x++) {
      for (let y = 0; y < mineFieldWidth; y++) {
        if (mineField[x][y].hasMine === false) {
          let cnt = 0;
          for (let u = x - 1; u <= x + 1; u++) {
            for (let v = y - 1; v <= y + 1; v++) {
              if (
                u >= 0 &&
                v >= 0 &&
                u < mineFieldHeight &&
                v < mineFieldWidth
              ) {
                if (mineField[u][v].hasMine === true) cnt++;
              }
            }
          }
          mineField[x][y].neighbors = cnt;
        }
      }
    }

    setField(mineField);
  }, [mineFieldWidth, mineFieldHeight, mineNum, keepGoin]);
  const spread = (x, y) => {
    if (mineField[x][y].isSpread) return;
    mineField[x][y].isSpread = true;
    for (let u = x - 1; u <= x + 1; u++) {
      for (let v = y - 1; v <= y + 1; v++) {
        if (u >= 0 && v >= 0 && u < mineFieldHeight && v < mineFieldWidth) {
          if (!field[u][v].hasMine) {
            mineField[u][v].isVisible = true;
            if (field[u][v].neighbors === 0 && (u !== x || v !== y))
              spread(u, v);
          }
        }
      }
    }
  };

  const check = (_field, u, v) => {
    _field[u][v].isVisible = true;
    for (let x = 0; x < mineFieldHeight; x++) {
      for (let y = 0; y < mineFieldWidth; y++) {
        if (_field[x][y].isVisible === true) continue;
        if (_field[x][y].hasMine === false) return false;
      }
    }
    return true;
  };

  const handleCell = (x, y) => {
    if(win) return
    let _field = [...field];
    if (check(_field, x, y)) {
      for (let i = 0; i < mineFieldHeight; i++) {
        for (let j = 0; j < mineFieldWidth; j++) {
          _field[i][j].isVisible = true;
          _field[i][j].isSpread = true;
        }
      }
      setField(_field);
      setOpenResult(true);
      setWin(false)
      return;
    }
    if (field[x][y].neighbors === 0) {
      mineField = [...field];
      spread(x, y);
      setField(mineField);
      return;
    }
    if (field[x][y].hasMine === true) {
      for (let i = 0; i < mineFieldHeight; i++) {
        for (let j = 0; j < mineFieldWidth; j++) {
          _field[i][j].isVisible = true;
          _field[i][j].isSpread = true;
        }
      }
      setField(_field);
      setOpenLose(true)
      return;
    }
    _field[x][y].isVisible = true;
    _field[x][y].isSpread = true;
    setField(_field);
  };

  const onContextMenu = (e, x, y) => {
    e.preventDefault();
    const _field = [...field];
    if (flagsNum > 0 || (flagsNum === 0 && _field[x][y].hasFlag)) {
      if (_field[x][y].hasFlag) setFlagsNum(flagsNum + 1);
      else setFlagsNum(flagsNum - 1);
      _field[x][y].hasFlag = !_field[x][y].hasFlag;
      setField(_field);
    }
  };

  const onFinish = (values) => {
    setMineFieldHeight(values.height);
    setMineFieldWidth(values.width);
    setMineNum(values.mines);
    setOpen(false);
  };

  const onOk = () => {
    setKeepGoin(true)
    setOpenLose(false)
    setOpenResult(false)
  };

  const newGame = () => {
    setWin(false)
    setKeepGoin(true)
  }

  return (
    <Space direction="vertical" className="mine">
      <Title level={1}>{tr("Mine Sweeper", lang)}</Title>
      <Space>
        {tr("Usable flags", lang)}:
        <InputNumber value={flagsNum} defaultValue={mineNum} readOnly />
        <Button onClick={() => setOpen(true)} type="primary">
          {tr("Setting", lang)}
        </Button>
        <Button onClick={() => newGame()} type="primary">{tr("New game", lang)}</Button>
      </Space>
      <Modal
        title="Set the game"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        okText="Don't toach me"
        okType="danger"
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="height"
            label="Height"
            initialValue={mineFieldHeight}
          >
            <InputNumber min={5} max={25} />
          </Form.Item>
          <Form.Item name="width" label="Width" initialValue={mineFieldWidth}>
            <InputNumber min={5} max={25} />
          </Form.Item>
          <Form.Item
            name="mines"
            label="Number of mines"
            initialValue={mineNum}
          >
            <InputNumber
              min={1}
              max={Math.floor(0.2 * mineFieldWidth * mineFieldHeight)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ marginTop: 20}}>
        {field.map((row, id) => (
          <div className="row" key={id}>
            {row.map((cell, idx) => (
              <Cell
                key={idx}
                cell={cell}
                onClick={() => handleCell(id, idx)}
                onContextMenu={(e) => onContextMenu(e, id, idx)}
              />
            ))}
          </div>
        ))}
      </div>
      <Modal open={openResult} title="You Won" onCancel={() => setOpenResult(false)} onOk={onOk}>
        Congratulations! You won, do you want to keep playing?
      </Modal>
      <Modal open={openLose} title="You Lose" onCancel={() => setOpenLose(false)} onOk={onOk}>
        Don&apos;t worry, you should get a new game, do you want to keep playing?
      </Modal>
    </Space>
  );
};

export default Minesweeper;
