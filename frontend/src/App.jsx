import { ConfigProvider, Layout, Menu, Space, Typography } from "antd";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Home from "./Home";
import HelloWorld from "./mini-app/Hello-world/HelloWorld";
import UnitConverter from "./mini-app/UnitConverter/UnitConverter";
import ChessBoard from "./mini-app/ChessBoard/ChessBoard";
import Calculator from "./mini-app/Calculator/Calculator";
import Pomodoro from "./mini-app/Pomodoro/Pomodoro";
import Minesweeper from "./mini-app/Minesweeper/Minesweeper";
import BigQuotes from "./mini-app/BigQuotes/BigQuotes";
import { Icon } from "@iconify/react";
import CelticIcon from "./CelticIcon";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";
import tr from "./translate";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const App = () => {
  const [lang, setLang] = useState("vi");
  const [collapsed, setCollapsed] = useState(false);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvYW5nIiwiY29tcGFueSI6IlNhbXN1bmcgU0RTIiwicG9zaXRpb24iOiJJVCBFbmdpbmVlcnMiLCJpYXQiOjE2ODkzMTg0MTF9.3ecuhnIbyWOj8tIMapD04FyngCPlBIHRkyhVA2Cvu-s";
  // const [token, setToken] = useState("");
  // let token = ""
  // useEffect(() => {
  //   if (token !== "") return;
  //   const takeToken = async () => {
  //     const res = await fetch("http://localhost:3000/authenticate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username: "hoang", password: "h1234" }),
  //     });
  //     const data = await res.json();
  //     setToken(data.token);
  //     // token = data.token
  //   };
  //   takeToken();
  // }, [token]);

  const items = [
    {
      label: collapsed ? (
        <div
          style={{ textAlign: "center" }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <MenuFoldOutlined size={16} />
        </div>
      ) : (
        <>
          <div onClick={() => setCollapsed(!collapsed)}>
            <MenuUnfoldOutlined size={16} />
            <Text
              style={{
                textTransform: "uppercase",
                marginLeft: 10,
              }}
            >
              {tr("Main menu", lang)}
            </Text>
          </div>
        </>
      ),
      type: "group",
      children: [
        {
          label: <Link to="/hello-world">{tr("Hello World", lang)}</Link>,
          key: "/hello-world",
          icon: <Icon icon="mdi:human-hello-variant" />,
        },
        {
          label: <Link to="/unit-converter">{tr("Unit Converter", lang)}</Link>,
          key: "/unit-converter",
          icon: <Icon icon="arcticons:priceconverter" />,
        },
        {
          label: <Link to="/chess-board">{tr("Chess Board", lang)}</Link>,
          key: "/chess-board",
          icon: <Icon icon="fa-solid:chess-board" />,
        },
        {
          label: <Link to="/calculator">{tr("Calculator", lang)}</Link>,
          key: "/calculator",
          icon: <Icon icon="ph:calculator-thin" />,
        },
        {
          label: <Link to="/pomodoro">{tr("Pomodoro", lang)}</Link>,
          key: "/pomodoro",
          icon: <Icon icon="icon-park-twotone:tomato" />,
        },
        {
          label: <Link to="/minesweeper">{tr("Mine Sweeper", lang)}</Link>,
          key: "/minesweeper",
          icon: <Icon icon="arcticons:minesweeper" />,
        },
        {
          label: <Link to="/big-quotes">{tr("Big Quotes", lang)}</Link>,
          key: "/big-quotes",
          icon: <Icon icon="ph:quotes-duotone" />,
        },
      ],
    },
  ];
  return (
    <Router>
      <ConfigProvider>
        <Layout className="container">
          <Layout>
            <Sider
              collapsed={collapsed}
              style={{
                borderRight: "1px solid #000",
                background: "transparent",
              }}
            >
              <Layout>
                <Header className="header">
                  <Space
                    direction="vertical"
                    className="header-container"
                    align="center"
                  >
                    <Link to={"/"}>
                      <Title level={4} className="title">
                        <CelticIcon size={36} />
                        <div className="super-app">{tr("Super App", lang)}</div>
                      </Title>
                    </Link>
                  </Space>
                  {/* <Button
                type="primary"
                onClick={toggleCollapsed}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button> */}
                </Header>
                <Menu items={items} mode="inline" />
              </Layout>
            </Sider>
            <Content>
              <Header className="main-header">
                <LanguageSwitcher
                  lang={lang}
                  languages={[
                    { lang: "vi", label: "VIE" },
                    { lang: "en", label: "ENG" },
                  ]}
                  onClick={(newLang) => setLang(newLang)}
                />
                <CelticIcon size={36} />
                <div className="hello">{tr("Hi, Tran Sy Hoang", lang)}</div>
              </Header>
              <Space className="routes">
                <Routes>
                  <Route path="/">
                    <Route index element={<Home lang={lang} token={token} />} />
                    <Route
                      path="/hello-world"
                      element={<HelloWorld lang={lang} />}
                    />
                    <Route
                      path="/unit-converter"
                      element={<UnitConverter lang={lang} />}
                    />
                    <Route
                      path="/chess-board"
                      element={<ChessBoard lang={lang} />}
                    />
                    <Route
                      path="/calculator"
                      element={<Calculator lang={lang} />}
                    />
                    <Route
                      path="/pomodoro"
                      element={<Pomodoro lang={lang} />}
                    />
                    <Route
                      path="/minesweeper"
                      element={<Minesweeper lang={lang} />}
                    />
                    <Route
                      path="/big-quotes"
                      element={<BigQuotes lang={lang} token={token} />}
                    />
                  </Route>
                </Routes>
              </Space>
            </Content>
          </Layout>
          <Footer className="footer">
            <Text italic>
              Copyright by Tran Sy Hoang from Phu Tho province in @2023
            </Text>
          </Footer>
        </Layout>
      </ConfigProvider>
    </Router>
  );
};

export default App;
