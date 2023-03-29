import { Menu, MenuProps } from "antd";
import { AppstoreOutlined, MailOutlined, UserOutlined, TeamOutlined, HomeOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './styles.scss'
import { isMobile } from "react-device-detect";

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
  getItem('Home', 'pagamentos', <HomeOutlined />),
  { type: 'divider' },
  getItem('Turmas', 'turmas', <TeamOutlined />),
  { type: 'divider' },
  getItem('Alunos', 'alunos', <UserOutlined />)
];

export default function Container() {
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    navigate('/' + e.key)
  };
  return (
    <div className="w-screen h-screen flex ctis-container">
      <Menu
        onClick={onClick}
        className='ctis-menu'
        defaultSelectedKeys={['pagamentos']}
        // defaultOpenKeys={['sub1']}
        mode={isMobile ? "horizontal" : "inline"}
        items={items}
      />
      <div className={"flex-grow " + (isMobile ? 'px-5' : 'p-10') + ' pb-4'}>
        <Outlet />
      </div>
    </div>
  );
}