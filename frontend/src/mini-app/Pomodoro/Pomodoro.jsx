/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, InputNumber, Modal, Space, Typography } from "antd";
import "./Pomodoro.css";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import tr from "../../translate";

const { Title } = Typography;
const Pomodoro = ({ lang }) => {
  const [working, setWorking] = useState(25*60);
  const [resting, setResting] = useState(5*60);

  const timer = {
    working: working,
    rest: resting,
  };
  const [pom, setPom] = useState(timer.working);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [rest, setRest] = useState(false);

  const [open, setOpen] = useState(false);
  const [stop, setStop] = useState(true);

  useEffect(() => {
    const _hour = Math.floor(pom / 3600);
    _hour < 10 ? setHour("0" + _hour) : setHour(_hour);
    const _minute = Math.floor((pom % 3600) / 60);
    _minute < 10 ? setMinute("0" + _minute) : setMinute(_minute);
    const _second = (pom % 3600) % 60;
    _second < 10 ? setSecond("0" + _second) : setSecond(_second);

    //
    if(stop) return
    let time = setTimeout(() => {
      if (pom === 0) {
        rest ? setPom(timer.working) : setPom(timer.rest);
        setRest(!rest);
        return;
      }
      setPom(pom - 1);
    }, 1000);
    return () => clearTimeout(time)
  }, [pom, stop]);

  const onFinish = (values) => {
    // console.log(values.rest)
    setWorking(values.work);
    setResting(values.rest);
    setOpen(false);
    setPom(values.work)
    setStop(true)
  };

  const reset = () => {
    setPom(timer.working)
    setRest(false)
    setStop(true)
  }
  return (
    <Space
      direction="vertical"
      className="pomodoro"
      style={{ backgroundColor: rest ? "aquamarine" : "pink" }}
    >
      <Title level={1}>{tr("Pomodoro", lang)}</Title>
      <Space direction="vertical">
        <Title level={3}>{rest ? tr("Take a rest", lang) : tr("Time to work", lang)}</Title>
        <Space className="clock">
          {hour}:{minute}:{second}
        </Space>
        <Space>
            <Button onClick={() => reset()}><Icon icon="bx:reset" fontSize={20}/></Button>
          <Button onClick={() => setStop(!stop)}>
            {stop ? <Icon icon="simple-line-icons:control-start" fontSize={15}/> : <Icon icon="ic:outline-pause" fontSize={20}/>}
          </Button>
          <Button onClick={() => setOpen(true)}><Icon icon="uil:setting" fontSize={20}/></Button>
        </Space>
        <Modal
          title="Set up time"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}
          okText="Don't toach me"
          okType="danger"
        >
          <Form onFinish={onFinish}>
            <Form.Item
              name="work"
              label="Work Time"
              rules={[
                { required: true, message: "Please input the work time" },
              ]}
              initialValue={working}
            >
              <InputNumber min={0} max={86400} />
            </Form.Item>
            <Form.Item
              name="rest"
              label="Rest Time"
              rules={[
                { required: true, message: "Please input the rest time" },
              ]}
              initialValue={resting}
            >
              <InputNumber min={0} max={18000} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </Space>
  );
};

export default Pomodoro;
