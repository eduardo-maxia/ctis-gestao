import { Menu, MenuProps } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  // getItem('Turmas', 'turmas_index', <MailOutlined />, [
  //   getItem('Buscar', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
  //   getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  // ]),

  // getItem('Alunos', 'sub2', <AppstoreOutlined />, [
  //   getItem('Option 5', '5'),
  //   getItem('Option 6', '6'),
  //   getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  // ]),

  // { type: 'divider' },

  getItem('Turmas', 'turmas', <SettingOutlined />),
  { type: 'divider' },
  getItem('Alunos', 'alunos', <SettingOutlined />),
  { type: 'divider' },
  getItem('Pagamentos', 'pagamentos', <SettingOutlined />),
];

export default function Container() {
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    navigate('/' + e.key)
  };

  return (
    <div className="w-screen h-screen flex">
      <Menu
        onClick={onClick}
        style={{ width: 256, paddingTop: 100 }}
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}