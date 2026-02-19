'use client';
import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

const DashboardHeader = () => {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const today = new Date();
    setDateStr(
      today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  return (
    <div className="bg-white  px-10 py-4 flex items-center justify-between flex-shrink-0">
      <div>
        <h2 className="text-2xl font-semibold tracking-widest text-gray-900">DASHBOARD</h2>
        <p className="text-xs text-gray-500">{dateStr}</p>
      </div>
   
    </div>
  );
};

export default DashboardHeader;
