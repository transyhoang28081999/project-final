/* eslint-disable react/prop-types */
const Node = ({ color, onClick }) => {
    return(
        <span className="node" style={{backgroundColor: color}} onClick={onClick}></span>
    )
}
export default Node