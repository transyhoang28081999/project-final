/* eslint-disable react/prop-types */
const Key = ({ item }) => {
    const style = {
        width: `${25*item.weight || 25}%`,
    }
    return(
        <button className="button" style={style} onClick={item.onClick}>{item.value}</button>   
    )
}

export default Key