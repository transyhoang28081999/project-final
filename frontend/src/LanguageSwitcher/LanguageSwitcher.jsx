/* eslint-disable react/prop-types */
import { Avatar, Dropdown, Typography } from "antd"
const { Text } = Typography

const LanguageSwitcher = ({ lang, languages, onClick }) => {

    function getFlag(lang) {
        return <Avatar size={16} shape="circle" 
                src={`./src/LanguageSwitcher/flags/${lang}-16x16.png`}/>
    }

    const menuItems = languages.map(item => ({
        key: item.lang,
        label: item.label,
        icon: getFlag(item.lang)
    }))

    const selectedLang = languages.find(item => item.lang === lang)

    return(
        <div className="language-switcher">
            <Dropdown menu={{
                items: menuItems,
                onClick: ({key}) => onClick(key)
            }}>
            <div style={{cursor: "pointer"}}>
                <Avatar size={16} shape="circle" 
                    style={{
                        marginRight: 10, 
                        verticalAlign: "text-bottom",
                        border: '1px solid blue'
                    }}
                    src={`./src/LanguageSwitcher/flags/${lang}-16x16.png`} />
                <Text style={{
                    display: 'inline-block',
                    width: '2em',
                    color: "white"
                }}>{selectedLang.label}</Text>
            </div>
        </Dropdown>
        </div>
    )
}

export default LanguageSwitcher