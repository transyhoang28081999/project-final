import { Card, Space, Typography } from "antd";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import tr from "./translate";

const { Title } = Typography;

const Home = ({ lang }) => {
  const [quote, setQuote] = useState({})
  useEffect(() => {
    const getQuote = async () => {
      const res = await fetch("http://localhost:3000/quote");
      const data = await res.json()
      setQuote(data)
    }
    getQuote()
  }, [])
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
