/* eslint-disable react/prop-types */
import { Card } from "antd";

const Quote = ({ quote }) => {
  return (
    <Card
      title={quote.author}
      className="card"
    >
      <p>{quote.quote}</p>
    </Card>
  );
};

export default Quote;
