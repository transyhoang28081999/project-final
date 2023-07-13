/* eslint-disable react/prop-types */
import { InputNumber, Select, Space, Typography } from "antd";
import "./UnitConverter.css";
import { useState } from "react";
import tr from "../../translate";

const { Title } = Typography;
const UnitConverter = ({ lang }) => {
  const currency = { USD: 0, VND: 1, YAN: 2, RUP: 3 };

  const currentRate = [
    [1, 23574, 144.37, 85.89],
    [1 / 23574, 1, 0.0061, 0.0036],
    [0.0069, 163.32, 1, 0.6],
    [0.012, 274.17, 1.68, 1],
  ];
  const [inner, setInner] = useState("USD");
  const [outer, setOuter] = useState("VND");
  //   const [innerQua, setInnerQua] = useState(0);
  const [outerQua, setOuterQua] = useState(0);

  const selectAfter = (
    <Select
      defaultValue="USD"
      style={{ width: 60 }}
      onSelect={(value) => setInner(value)}
    >
      <Select.Option value="USD">&#x24;</Select.Option>
      <Select.Option value="VND">&#x20AB;</Select.Option>
      <Select.Option value="YAN">&#xa5;</Select.Option>
      <Select.Option value="RUP">&#x20BD;</Select.Option>
    </Select>
  );
  const disabled_input_after = (
    <Select
      defaultValue="VND"
      style={{ width: 60 }}
      onSelect={(value) => setOuter(value)}
    >
      <Select.Option value="USD">&#x24;</Select.Option>
      <Select.Option value="VND">&#x20AB;</Select.Option>
      <Select.Option value="YAN">&#xa5;</Select.Option>
      <Select.Option value="RUP">&#x20BD;</Select.Option>
    </Select>
  );
  return (
    <Space direction="vertical" className="unitConverter">
      <Title level={1}>{tr("Unit Converter", lang)}</Title>
      <Space direction="vertical" className="coverInput" wrap="true">
        <Space>
          <Title level={4} style={{display: 'inline-block', width:100}}>{tr("From", lang)}:</Title>
          <InputNumber
            className="input"
            size="large"
            addonBefore={inner}
            addonAfter={selectAfter}
            onChange={(value) =>
              setOuterQua(value * currentRate[currency[inner]][currency[outer]])
            }
          />
        </Space>
        <Space>
          <Title level={4} style={{display: 'inline-block', width:100}}>{tr("To", lang)}:</Title>
          <InputNumber
            className="input"
            size="large"
            readOnly
            addonBefore={outer}
            addonAfter={disabled_input_after}
            value={outerQua}  
          />
        </Space>
        {/* <Button onClick={changeMoney}>Convert</Button> */}
      </Space>
    </Space>
  );
};

export default UnitConverter;
