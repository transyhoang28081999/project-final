/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { InputNumber, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import "./BigQuotes.css";
import Quote from "./Quote";
import tr from "../../translate";

const { Title } = Typography;

const BigQuotes = ({ lang, token }) => {
  const [number, setNumber] = useState(3);
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const getQuotes = async () => {
      if(token === "") return
      const res = await fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token
        },
        body: JSON.stringify({ num: number }),
      });
      const data = await res.json();
      setQuotes(data);
    };
    getQuotes();
  }, [number, token]);
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
      <Space direction="vertical">
        {quotes.map((quote, id) => {
          return <Quote key={id} quote={quote} />;
        })}
      </Space>
    </Space>
  );
};

export default BigQuotes;
