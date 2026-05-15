import { Avatar, Navbar, NavbarContent, NavbarItem } from '@heroui/react';
import { Link } from 'react-router';
import { useProfile } from '@/app/providers/profile/ProfileContext.ts';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const { profile } = useProfile();
  const username = `${profile?.firstName} ${profile?.lastName}`;
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Темы', href: '/', match: (path: string) => path === '/' || path.startsWith('/themes') },
    { label: 'Избранное', href: '/favorites' },
    { label: 'Мои заявки', href: '/my-applications' },
    { label: 'Предложить тему', href: '/propose' },
  ];

  return (
    <Navbar
      className="flex min-h-[74px] items-center justify-between bg-[#F4F4F5]"
      classNames={{ wrapper: 'max-w-full px-[10vw]' }}
      position="static"
    >
      <Link className="flex items-center gap-2 " to="/profile">
        <Avatar name={username} />
        <p>{username}</p>
      </Link>
      <NavbarContent justify="end">
        {navItems.map((item) => {
          const isActive = item.match ? item.match(pathname) : pathname === item.href;
          return (
            <NavbarItem key={item.href} isActive={isActive}>
              <Link to={item.href} className={isActive ? 'text-blue-600' : 'text-gray-400 hover:text-black'}>
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
    </Navbar>
  );
};
