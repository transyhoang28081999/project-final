/* eslint-disable react/prop-types */
const Screen = ({ input, result }) => {
  return (
    <div className="screen">
      <div className="input">
        <input type="text" value={input} disabled/>
      </div>
      <div className="show">
        <input type="text" value={result} disabled/>
      </div>
    </div>
  );
};

export default Screen;
