/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { InputNumber, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import "./BigQuotes.css";
import Quote from "./Quote";
import tr from "../../translate";


const { Title } = Typography;

const BigQuotes = ({lang}) => {
  const [number, setNumber] = useState(3);
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const getQuotes = async () => {
      const res = await fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ num: number }),
      });
      const data = await res.json();
      setQuotes(data);
    };
    getQuotes();
  }, [number]);
  return (
    <Space direction="vertical" className="big-quotes">
      <Title>{tr("All Immortal Quotes", lang)}</Title>
      {tr("Number of Quotes:", lang)}
      <InputNumber
        defaultValue={number}
        onPressEnter={(e) => setNumber(e.target.value)}
        min={1}
        max={20}
      />
      {quotes.map((quote, id) => {
        return <Quote key={id} quote={quote} />;
      })}
    </Space>
  );
};

export default BigQuotes;
