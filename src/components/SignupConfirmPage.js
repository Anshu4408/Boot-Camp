'use client';
import React from 'react';
import { useRouter } from 'next/navigation';


const SignupConfirmPage = () => {
    const router = useRouter();


    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-start gap-5">
            <div className="flex items-center  py-5 justify-center my-20  ">

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

            
                    <div className="w-40 h-40 flex items-center justify-center">


                        <svg viewBox="0 0 171 171" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M76.2437 3.43226C81.5379 -1.14417 89.3879 -1.14417 94.6821 3.43226C98.438 6.67896 103.625 7.71068 108.337 6.14845C114.98 3.94639 122.232 6.95043 125.372 13.2045C127.6 17.6414 131.997 20.5795 136.948 20.9396C143.928 21.4471 149.479 26.9979 149.986 33.9775C150.346 38.9291 153.285 43.3262 157.721 45.5538C163.975 48.6937 166.98 55.9461 164.777 62.5886C163.215 67.3011 164.247 72.4879 167.494 76.2438C172.07 81.538 172.07 89.388 167.494 94.6822C164.247 98.4381 163.215 103.625 164.777 108.337C166.98 114.98 163.975 122.232 157.721 125.372C153.285 127.6 150.346 131.997 149.986 136.949C149.479 143.928 143.928 149.479 136.948 149.986C131.997 150.347 127.6 153.285 125.372 157.722C122.232 163.976 114.98 166.98 108.337 164.778C103.625 163.215 98.438 164.247 94.6821 167.494C89.3879 172.07 81.5379 172.07 76.2437 167.494C72.4878 164.247 67.301 163.215 62.5885 164.778C55.946 166.98 48.6936 163.976 45.5537 157.722C43.3261 153.285 38.9289 150.347 33.9773 149.986C26.9977 149.479 21.447 143.928 20.9394 136.949C20.5794 131.997 17.6413 127.6 13.2044 125.372C6.95031 122.232 3.94627 114.98 6.14833 108.337C7.71056 103.625 6.67883 98.4381 3.43214 94.6822C-1.14429 89.388 -1.14429 81.538 3.43214 76.2438C6.67883 72.4879 7.71056 67.3011 6.14833 62.5886C3.94627 55.9461 6.95031 48.6937 13.2044 45.5538C17.6413 43.3262 20.5794 38.9291 20.9394 33.9775C21.447 26.9979 26.9977 21.4471 33.9773 20.9396C38.9289 20.5795 43.3261 17.6414 45.5537 13.2045C48.6936 6.95044 55.946 3.94639 62.5885 6.14845C67.301 7.71068 72.4878 6.67896 76.2437 3.43226Z" fill="#764BE6" />
                            <g filter="url(#filter0_d_222_552)">
                                <circle cx="85.5" cy="85.5" r="64.6734" fill="#ECF0FF" />
                            </g>
                            <defs>
                                <filter id="filter0_d_222_552" x="7.36713e-05" y="0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="3.61809" />
                                    <feGaussianBlur stdDeviation="1.80905" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_222_552" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_222_552" result="shape" />
                                </filter>
                            </defs>
                            <path d="M69.6484 90.4522L83.2201 104.02L110.352 76.8844" stroke="#764BE6" strokeWidth="5.42714" strokeLinecap="round" strokeLinejoin="round" />

                        </svg>
                    </div>







            <div className="flex flex-col items-center justify-center gap-1">
                 <h1 className="text-xl font-medium text-gray-900 mb-2">
                    Account created successfully!
                </h1>
                <p className="text-sm text-[#9C9AA5] max-w-sm mb-8 text-center">
                    Welcome aboard! Start your success journey with SimpleFlow!
                </p>
            </div>

               

                <button
                    type="button"
                    className="px-8 py-2.5 bg-[#7C4BE7] text-white rounded-md text-sm font-semibold shadow-sm hover:bg-[#6C40D4] transition cursor-pointer"
                    onClick={() => router.push('/user/dashboard')}
                >
                    Let&apos;s Start!
                </button>
            </div>
       
    );
};

export default SignupConfirmPage;
