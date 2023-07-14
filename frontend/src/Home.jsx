/* eslint-disable react/prop-types */
import { Card, Space, Typography } from "antd";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import tr from "./translate";

const { Title } = Typography;

const Home = ({ lang, token }) => {
  const [quote, setQuote] = useState({})
  // console.log(token)
  useEffect(() => {
    if(token === "") return
    const getQuote = async () => {
      const res = await fetch("http://localhost:3000/quote",{
        headers: {token: token}
      });
      const data = await res.json()
      // console.log(data)
      setQuote(data)
    }
    getQuote()
  }, [token])
  return (
    <Space direction="vertical" className="home">
      <Title>{tr("Immortal Quotes", lang)}</Title>
      <Card
        title={quote.author}
        extra={<Link to="/big-quotes">More</Link>}
        className="card"
      >
        <p>{quote.quote}</p>
      </Card>
    </Space>
  );
};

export default Home;
