'use client';
import React, { useEffect, useState } from 'react';

export interface ClubType {
  id: string;
  title: string;
  description: string;
  url: string;
  created_at: string;
}

const Notifications = () => {
  const [data, setData] = useState<ClubType[]>([]); // State to store fetched data

  const getData = async () => {
    try {
      const myHeaders = new Headers();
      const formdata = new FormData();
      formdata.append('Instemailid', 'ogmmech@bmsit.in');
      formdata.append('Loginid', 'bisscmd');
      formdata.append('Loginpwd', 'SNr@12#$%&!Rk' ); // Use environment variable for sensitive data

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://www.services.bis.gov.in/php/BIS_2.0/dgdashboard/Standards_master/get_academic_dashboard_banner_scroll_items',
        requestOptions
      );
      const result = await response.json();
      setData(result?.banner_scroll_data); // Update state with fetched data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData(); // Initial call to fetch data

    const interval = setInterval(() => {
      getData(); // Call getData every 2 minutes
    }, 120000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const isNew = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays < 7;
  };

  return (
    <div className="p-4 bg-black min-h-screen">
    <h1 className="text-2xl font-bold text-white mb-4">Announcements</h1>
    {data.length > 0 ? (
      <div className="grid grid-cols-1  gap-6">
        {data.map((item) => (
          <div key={item.id} className="relative bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden">
            {isNew(item.created_at) && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                New
              </span>
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
              <p className="text-gray-300 mb-4">{item.description}</p>
              <a
                href={item.url}
                className="text-indigo-400 hover:text-indigo-600 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </div>
            <div className="bg-gray-700 px-6 py-4">
              <p className="text-gray-400 text-sm">
                Created at: {item?.created_at}
              </p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-white">Loading...</p>
    )}
  </div>
  );
};

export default Notifications;