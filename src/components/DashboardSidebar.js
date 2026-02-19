'use client';
import React from 'react';
import { LayoutDashboard, BookOpen, Calendar, User, CheckSquare, CreditCard, Settings, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuthToken } from '@/components/AuthTokenProvider';

const DashboardSidebar = () => {
    const router = useRouter();
    const { logout } = useAuthToken();
  const pathname = usePathname();

  // const menuItems = [
  //   { icon: LayoutDashboard, label: 'Dashboard', href: '/user/dashboard', badge: null },
  //   { icon: BookOpen, label: 'Courses', href: '/user/courses', badge: '10' },
  //   { icon: Calendar, label: 'Schedule', href: '/user/schedule', badge: null },
  //   { icon: User, label: 'Profile', href: '/user/profile', badge: null },
  //   { icon: CheckSquare, label: 'To-do', href: '/user/todo', badge: null },
  //   { icon: CreditCard, label: 'Payments', href: '/user/payments', badge: null },
  // ];
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/user/dashboard', badge: null },
    { icon: BookOpen, label: 'Courses', href: '/user/courses', badge: '10' },
   
    { icon: User, label: 'Profile', href: '/user/profile', badge: null },
  
  ];
  const isActive = (href) => pathname === href;

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  return (
    <div className="w-48 bg-white h-screen flex flex-col ">
      {/* Logo */}
      <div className="flex items-center gap-1 py-5">
  {/* Icon */}
  <div className="w-10 h-10 flex items-center justify-center">
    <svg
      viewBox="0 0 40 40"
      className="w-6 h-6 text-[#3A383F]"
      fill="none"
    >
      <path
        d="M11 26V24H24V26H11ZM27.6 25L22.6 20L27.6 15L29 16.4L25.4 20L29 23.6L27.6 25ZM11 21V19H21V21H11ZM11 16V14H24V16H11Z"
        fill="currentColor"
      />
    </svg>
  </div>

  {/* Logo text */}
  <svg
    viewBox="0 0 136 23"
    className="h-4 w-auto"
    fill="none"
  >
    <path
      d="M6.72342 4.20672H9.23907V17.7325H26.9275V20H6.72342V4.20672ZM55.5 4.20672C58.5233 4.20672 59.7529 5.43634 59.7529 8.45963V15.7471C59.7529 18.7704 58.5233 20 55.5 20H41.8952C38.8719 20 37.6536 18.7704 37.6536 15.7471V8.45963C37.6536 5.43634 38.8719 4.20672 41.8952 4.20672H55.5ZM40.1354 15.4876C40.1354 17.3941 40.4738 17.7325 42.3803 17.7325H55.0262C56.9214 17.7325 57.2711 17.3941 57.2711 15.4876V8.71909C57.2711 6.81261 56.9214 6.47418 55.0262 6.47418H42.3803C40.4738 6.47418 40.1354 6.81261 40.1354 8.71909V15.4876ZM93.4172 4.20672V6.47418H77.545C75.6385 6.47418 75.3001 6.81261 75.3001 8.71909V15.4876C75.3001 17.3941 75.6385 17.7325 77.545 17.7325H90.9354V13.1976H83.1178V10.9301H93.4172V20H77.0599C74.0366 20 72.8183 18.7704 72.8183 15.7471V8.45963C72.8183 5.43634 74.0366 4.20672 77.0599 4.20672H93.4172ZM124.309 4.20672C127.332 4.20672 128.562 5.43634 128.562 8.45963V15.7471C128.562 18.7704 127.332 20 124.309 20H110.704C107.681 20 106.463 18.7704 106.463 15.7471V8.45963C106.463 5.43634 107.681 4.20672 110.704 4.20672H124.309ZM108.945 15.4876C108.945 17.3941 109.283 17.7325 111.189 17.7325H123.835C125.731 17.7325 126.08 17.3941 126.08 15.4876V8.71909C126.08 6.81261 125.731 6.47418 123.835 6.47418H111.189C109.283 6.47418 108.945 6.81261 108.945 8.71909V15.4876Z"
      fill="currentColor"
    />
  </svg>
</div>

      {/* Menu Items */}
      <nav className="flex-1 p-2 space-y-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-3 px-3 py-1 rounded-sm cursor-pointer transition text-sm 
                ${
                isActive(item.href)
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
               onClick={() => router.push(item.href)}
            >
              <Icon size={18} />
              <span className="font-medium flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-xs font-semibold text-gray-500">
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Menu */}
      <div className="p-2  space-y-6">
        {/* <div className="flex items-center gap-3 px-3 py-1 rounded-sm cursor-pointer text-gray-600 hover:bg-gray-100 transition text-sm ">
          <Settings size={18} />
          <span className="font-medium">Settings</span>
        </div> */}
        <div 
          className="flex items-center gap-3 px-3 py-1 rounded-sm cursor-pointer text-gray-600 hover:bg-gray-100 transition text-sm"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className="font-medium">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
