import Link from 'next/link';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link href='/admin/templates'>Templates</Link>,
  },
  {
    key: '2',
    label: <Link href='/admin/subscriptions'>Subscriptions</Link>,
  },
  {
    key: '3',
    label: <Link href='/admin/users'>Users</Link>,
  },
];

function AdminMenu() {
  return (
    <div>
      <Dropdown
        menu={{ items }}
        placement='bottomLeft'
        arrow={{ pointAtCenter: true }}
      >
        <Button size='small'>Admin</Button>
      </Dropdown>
    </div>
  );
}
export default AdminMenu;
