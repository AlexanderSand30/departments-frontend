import React, { useState } from "react";
import { Layout, Menu, Avatar, Space, Dropdown, Button, Card, Tabs, Flex, ConfigProvider } from "antd";
import { BellOutlined, DownloadOutlined, DownOutlined, PlusOutlined, QuestionCircleOutlined, ShoppingCartOutlined, UploadOutlined, UpOutlined, XOutlined } from "@ant-design/icons";
import ListDepartment from "./ListDepartment";

const { Header } = Layout;

const itemsMenu = [
    { key: "nav-dashboard", label: "Dashboard" },
    { key: "nav-org", label: "Organización" },
    {
        key: "nav-model",
        label: (<span>Modelos <DownOutlined /></span>),
        children: [
            { key: "subM0", label: "Item 1" },
            { key: "subM1", label: "Item 2" }
        ]
    },
    {
        key: "nav-tracking",
        label: (<span>Seguimiento <DownOutlined /></span>),
        children: [
            { key: "subS0", label: "Item 1" },
            { key: "subS1", label: "Item 2" }
        ]
    }
];

const userMenu = [
    { key: "0", label: <a href="#">Perfil</a> },
    { key: "1", label: <a href="#">Configuración</a> },
    { key: "2", label: <a href="#">Cerrar sesión</a> }
];

const Departments: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const onChange = (key: string) => {
        console.log(key);
    };


    return (
        <>
            <Header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#1890ff",
                    padding: "0 20px"
                }}
            >
                {/* Logo */}
                <div style={{ color: "#fff", fontSize: 20, fontWeight: "bold", paddingRight:35 }}>
                    <XOutlined />
                </div>

                {/* Menú */}
                <Menu
                    mode="horizontal"
                    theme="dark"
                    items={itemsMenu}
                    style={{ flex: 1, minWidth: 0, background: "transparent" }}
                />

                {/* Iconos y Avatar */}
                <Space>
                    <Button type="text" icon={<ShoppingCartOutlined />} style={{ color: "#fff" }} />
                    <Button type="text" icon={<QuestionCircleOutlined />} style={{ color: "#fff" }} />
                    <Button type="text" icon={<BellOutlined />} style={{ color: "#fff" }} />
                    <Dropdown menu={{ items: userMenu }} trigger={["click"]} onOpenChange={setMenuOpen}>
                        <Space style={{ cursor: "pointer" }}>
                            <Avatar style={{ backgroundColor: "#f56a00" }}>A</Avatar>
                            <span style={{ color: "#fff", marginRight: "12px" }}>Administrador</span>
                            {menuOpen ? <UpOutlined style={{ color: "#fff" }} /> : <DownOutlined style={{ color: "#fff" }} />}
                        </Space>
                    </Dropdown>
                </Space>
            </Header>
            <Card>
                <Flex gap="small" justify="space-between" style={{ padding: '0px' }} wrap>
                    <div>Orgranización</div>
                    <div>
                        <ConfigProvider
                            theme={{
                                token: {
                                    paddingContentHorizontal: 8
                                },
                            }}
                        >
                            <Space>
                                <Button type="primary"><PlusOutlined /></Button>
                                <Button><UploadOutlined /></Button>
                                <Button><DownloadOutlined /></Button>
                            </Space>
                        </ConfigProvider>
                    </div>
                </Flex>
                <Tabs
                    defaultActiveKey="tab-1"
                    tabBarStyle={{ background: "#fff" }}
                    style={{
                        backgroundColor: "#fafafa",
                        padding: "0px",
                    }}
                    items={[
                        { key: 'tab-1', label: 'Divisiones', children: <ListDepartment /> },
                        { key: 'tab-2', label: 'Colaboradores' }
                    ]}
                    onChange={onChange}
                />
            </Card>

        </>
    );
};

export default Departments;
