/* eslint-disable react/prop-types */
import Key from "./Key"

const KeyBoard = ({ items }) => {
    return (
        <div className="key-board">
            {items.map((item, id) => {
                return <Key key={id} item={item}/>
            })}
        </div>
    )
}
export default KeyBoard